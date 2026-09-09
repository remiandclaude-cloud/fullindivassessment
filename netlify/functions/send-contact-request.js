// Zero dependencies — calls Resend REST API directly with fetch.
// Sends a "someone wants to train" inquiry from the Results page CTA to the
// equipped team's inbox — separate from send-results.js, which emails the
// visitor their own assessment report.

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    var body = JSON.parse(event.body);
    var name = body.name;
    var email = body.email;
    var message = body.message || "";
    var part1Pct = body.part1Pct;
    var part2Pct = body.part2Pct;

    if (!name || !email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields: name, email" }) };
    }

    var apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "RESEND_API_KEY not configured" }) };
    }

    var scoreLine = "";
    if (part1Pct != null || part2Pct != null) {
      var p1 = part1Pct != null ? Math.round(part1Pct) + "%" : "n/a";
      var p2 = part2Pct != null ? Math.round(part2Pct) + "%" : "n/a";
      scoreLine = '<p style="font-size:13px;color:#8a8980;">Assessment scores — Part 1: ' + p1 + " &middot; Part 2: " + p2 + "</p>";
    }

    var html =
      '<div style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#1f1f1e;max-width:560px;">' +
      "<h2 style=\"margin:0 0 16px;\">New training inquiry</h2>" +
      "<p><strong>Name:</strong> " + name + "</p>" +
      "<p><strong>Email:</strong> " + email + "</p>" +
      (message ? "<p><strong>Message:</strong><br/>" + message.replace(/\n/g, "<br/>") + "</p>" : "") +
      scoreLine +
      "</div>";

    var response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "equipped. <hello@equipped.to>",
        to: ["hello@equipped.to"],
        reply_to: email,
        subject: "New training inquiry from " + name,
        html: html,
      }),
    });

    var result = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", response.status, result);
      return { statusCode: 500, body: JSON.stringify({ error: "Resend API error: " + (result.message || response.status) }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, emailId: result.id }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || "Internal server error" }) };
  }
};
