// Zero dependencies — calls Resend REST API directly with fetch

const LOGO_DATA_URI = "data:image/png;base64,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";

function getTier(pct) {
  if (pct < 40) return "wakingUp";
  if (pct <= 80) return "building";
  return "equipped";
}

function getTierLabel(tier) {
  return { wakingUp: "Waking Up", building: "Building", equipped: "equipped." }[tier];
}

var tierDescriptions = {
  notice: {
    wakingUp: "Your awareness of what's happening inside you is still waking up. Sensations, thoughts, and shifts in your state tend to pass by unnoticed until they're loud. You're living more from autopilot than from real time data. This isn't where you're stuck. It's where you're starting. Most people walk through life without ever questioning how much they're actually feeling versus how much they're missing. The fact that you're measuring it puts you ahead of where you think you are. And Notice is the fastest skill to build because it only requires one thing: attention. You are at the beginning of developing this skill, and this is when progress can be the most palpable. Small shifts in awareness compound fast.",
    building: "You're noticing more than most people do. Body signals land, thought patterns get caught mid loop, and you can sometimes sit with what arises without reacting. But it's inconsistent. Under pressure, fatigue, or distraction, the channel narrows and you lose the thread. This is the most common place to be, and it's also the most exciting. You've proven that awareness is available to you. The work now is making it resilient enough to hold up when it matters most, not just on quiet mornings but in the moments where your system is under real load. The gap between your best and worst days of noticing is your opportunity. Closing that gap is what separates someone who notices from someone who is equipped. to notice.",
    equipped: "You have a strong, open channel to your internal world. You read your body in real time, you catch your thoughts before they run the show, and you can sit in stillness without needing to escape. This is the sensory foundation that makes everything else possible. You don't just notice. You notice early, accurately, and consistently. Most people never get here because they never train it. You have. The question now is depth. How subtle can the signal be and still reach you? How early can you catch the shift? How still can you stay when everything in you wants to move? You are operating at a high level. How much more equipped. are you interested in getting?",
  },
  shift: {
    wakingUp: "When your state changes, you go with it. Activation stays high, flatness lingers, and stress sticks. You don't yet have reliable tools to move yourself between states, and your body tends to get stuck in whatever mode it lands in. The signals might be there, but the ability to act on them and change course hasn't been built yet. This shows up in how long stress follows you home, how hard it is to get going when you're flat, and how often you override what your body is telling you rather than responding to it. You are at the beginning of developing this skill, and this is when progress can be the most palpable. Learning even one reliable tool to shift your state changes your entire relationship with stress, energy, and performance.",
    building: "You can shift your state, but not always when it counts. On calm days, your tools work. Under real pressure, they become harder to access. You can come down from activation sometimes, pull yourself up from flat sometimes, and act on your body's signals sometimes. The pattern is there. What's missing is reliability under load. The moments where you most need to shift are the moments where shifting is hardest, and that's exactly where the training needs to happen. Consistency and speed are the next edge. You have the tools. The opportunity now is making them available to you in the moments that actually matter, not just the moments that are easy.",
    equipped: "You move between states deliberately. You regulate down from activation, up from shutdown, and you act on what your body tells you in real time. Stress doesn't stick, flatness doesn't trap you, and your body's signals get a response, not an override. Your nervous system is not just reactive. It's steerable. This is rare. Most people spend their entire lives being driven by their state rather than driving it. You've built the ability to choose. The question now is range. Can you shift faster? Can you hold a chosen state longer? Can you move through states that used to take you hours in minutes? You are operating at a high level. How much more equipped. are you interested in getting?",
  },
  expand: {
    wakingUp: "Your world is shaped more by default than by design. You endure your environment rather than curating it, you avoid the situations that would stretch your capacity, and your nervous system doesn't get the deliberate care it needs to grow. This isn't a character flaw. It means the conditions for expansion haven't been set up yet. Most people never realise that their environment, their exposure, and their daily inputs are all variables they can control. You're measuring them now, and that's the first step. Setting them up is entirely within your control, and the return on even small changes here is enormous. You are at the beginning of developing this skill, and this is when progress can be the most palpable. Your window of tolerance is ready to grow. It's just waiting for the right conditions.",
    building: "You're growing, but unevenly. Some areas of expansion are active: maybe you seek hard conversations but neglect your physical environment, or you nurture your system but avoid real exposure. The pieces are in motion but they're not yet a system. You've shown you can stretch in certain directions. The insight from this score is about what you're avoiding, not what you're doing. The areas you score lowest in are almost certainly the ones that would unlock the most growth. The next step is treating all three, environment design, deliberate exposure, and nervous system care, as equally important. Your biggest opportunity is in the dimension you've been neglecting.",
    equipped: "You are actively expanding your capacity on all fronts. You design your environment to support your system, you seek discomfort deliberately to widen your window of tolerance, and you feed your nervous system with the inputs it needs to sustain that growth. This is not maintenance. This is someone building a bigger container, on purpose, every day. Very few people operate here because expansion requires the willingness to keep going when you're already doing well. You're not resting on what you've built. You're building more. The question now is: where is the ceiling? What would it look like to go even further? You are operating at a high level. How much more equipped. are you interested in getting?",
  },
};

var questionMeta = [
  { id: "N1", category: "notice", title: "Body Signals" },
  { id: "N2", category: "notice", title: "Breath Patterns" },
  { id: "N3", category: "notice", title: "Emotional Signatures" },
  { id: "N4", category: "notice", title: "State Recognition" },
  { id: "N5", category: "notice", title: "Early Warning" },
  { id: "N6", category: "notice", title: "Hunger and Fatigue" },
  { id: "N7", category: "notice", title: "Heart Rhythm" },
  { id: "N8", category: "notice", title: "Room Reading" },
  { id: "N9", category: "notice", title: "After Effects" },
  { id: "S1", category: "shift", title: "Down Regulation" },
  { id: "S2", category: "shift", title: "Up Regulation" },
  { id: "S3", category: "shift", title: "Breath as a Tool" },
  { id: "S4", category: "shift", title: "Recovery" },
  { id: "S5", category: "shift", title: "Staying Unstuck" },
  { id: "S6", category: "shift", title: "Response Over Reaction" },
  { id: "S7", category: "shift", title: "Substance Independence" },
  { id: "S8", category: "shift", title: "Pressure Performance" },
  { id: "S9", category: "shift", title: "Sleep Transition" },
  { id: "E1", category: "expand", title: "Discomfort Tolerance" },
  { id: "E2", category: "expand", title: "Receiving Feedback" },
  { id: "E3", category: "expand", title: "Implementing Feedback" },
  { id: "E4", category: "expand", title: "Hard Conversations" },
  { id: "E5", category: "expand", title: "Circling Back" },
  { id: "E6", category: "expand", title: "Self Reflection" },
  { id: "E7", category: "expand", title: "Emotional Stretch" },
  { id: "E8", category: "expand", title: "Self Deconstruction" },
  { id: "E9", category: "expand", title: "Raising the Floor" },
];

var categoryNames = { notice: "Notice", shift: "Shift", expand: "Expand" };

function buildTriangleSVG(noticePct, shiftPct, expandPct) {
  var cx = 200, cy = 200, R = 130;
  var angles = [-Math.PI / 2, Math.PI * 5 / 6, Math.PI / 6];
  var names = ["Notice", "Shift", "Expand"];
  var pcts = [noticePct, shiftPct, expandPct];

  var vertices = angles.map(function(a) { return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }; });

  var gridLevels = [0.33, 0.66, 1.0];
  var gridPaths = gridLevels.map(function(level) {
    var pts = angles.map(function(a) { return (cx + R * level * Math.cos(a)) + "," + (cy + R * level * Math.sin(a)); });
    return '<path d="M' + pts.join("L") + 'Z" fill="none" stroke="#3a3a38" stroke-width="1" />';
  }).join("");

  var axes = vertices.map(function(v) {
    return '<line x1="' + cx + '" y1="' + cy + '" x2="' + v.x + '" y2="' + v.y + '" stroke="#3a3a38" stroke-width="1" />';
  }).join("");

  var valuePts = angles.map(function(a, i) {
    var v = pcts[i] / 100;
    return (cx + R * v * Math.cos(a)) + "," + (cy + R * v * Math.sin(a));
  });
  var valuePath = '<path d="M' + valuePts.join("L") + 'Z" fill="rgba(217,119,87,0.18)" stroke="#D97757" stroke-width="2.5" />';

  var dots = angles.map(function(a, i) {
    var v = pcts[i] / 100;
    var px = cx + R * v * Math.cos(a);
    var py = cx + R * v * Math.sin(a);
    return '<circle cx="' + px + '" cy="' + py + '" r="5.5" fill="#D97757" stroke="#2C2C2B" stroke-width="2" />';
  }).join("");

  var labelOffset = 26;
  var labels = angles.map(function(a, i) {
    var lx = cx + (R + labelOffset + 6) * Math.cos(a);
    var ly = cy + (R + labelOffset) * Math.sin(a);
    return '<text x="' + lx + '" y="' + ly + '" text-anchor="middle" fill="#f0efea" font-size="14" font-weight="600" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">' + names[i] + '</text>' +
      '<text x="' + lx + '" y="' + (ly + 17) + '" text-anchor="middle" fill="#D97757" font-size="13" font-weight="600" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">' + Math.round(pcts[i]) + '%</text>';
  }).join("");

  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="340" height="340" style="display:block;margin:0 auto;max-width:100%;height:auto;">' +
    axes + gridPaths + valuePath + dots + labels + '</svg>';
}

function generateSummary(noticePct, shiftPct, expandPct) {
  var noticeS = {
    wakingUp: "Your awareness of internal signals is still developing. You tend to notice what's happening in your body only after it's already loud. Notice is the fastest skill to build because it only requires one thing: attention.",
    building: "You're building real body awareness. Some days you catch the signals early, other days they slip past you. The gap between your best and worst days of noticing is your opportunity.",
    equipped: "Your interoceptive awareness is strong. You read your body's signals in real time, catching shifts before they build. The question now is depth and subtlety.",
  };
  var shiftS = {
    wakingUp: "When your state shifts, you don't yet have reliable tools to move through it. Your system tends to get stuck. Learning even one reliable tool changes everything.",
    building: "You have tools that work on good days, but under real pressure they can disappear. The opportunity is making them available in the moments that actually matter.",
    equipped: "You move between states deliberately. You regulate without external crutches and perform under pressure. The question now is range and speed.",
  };
  var expandS = {
    wakingUp: "Your world is shaped more by default than by design. The conditions for expansion haven't been set up yet, and even small changes here produce enormous returns.",
    building: "You're growing, but unevenly. The subcategories you score lowest in are almost certainly the ones that would unlock the most growth.",
    equipped: "You actively expand your capacity on all fronts. You design your environment, seek discomfort deliberately, and feed your nervous system what it needs.",
  };
  return [noticeS[getTier(noticePct)], shiftS[getTier(shiftPct)], expandS[getTier(expandPct)]];
}

function buildEmailHTML(params) {
  var userName = params.userName;
  var answers = params.answers;
  var catScores = params.catScores;
  var overallPct = params.overallPct;
  var overallTier = params.overallTier;
  var summaryLines = params.summaryLines;
  var hideScores = !!params.hideScores;

  var tierColor = { wakingUp: "#8a8980", building: "#D9B557", equipped: "#D97757" };
  function tierColorValue(v) {
    if (!v || v < 4) return "#8a8980";
    if (v <= 8) return "#D9B557";
    return "#D97757";
  }
  var triangleBlock = "";
  if (!hideScores) {
    var triangleSVG = buildTriangleSVG(catScores[0].pct, catScores[1].pct, catScores[2].pct);
    triangleBlock = '<div style="text-align:center;padding:8px 0 24px;">' + triangleSVG + '</div>';
  }

  var categoryBlocks = catScores.map(function(cat) {
    var desc = tierDescriptions[cat.id][cat.tier];

    var qsHTML = cat.questions.map(function(q) {
      var score = answers[q.id] || 0;
      var pctWidth = (score / 10) * 100;
      var c = tierColorValue(score);
      return '<tr><td style="padding:4px 0;font-size:12px;color:#9e9d92;width:140px;">' + q.id + '. ' + q.title + '</td><td style="padding:4px 6px;"><div style="background:#2C2C2B;border-radius:3px;height:5px;width:100%;"><div style="background:' + c + ';border-radius:3px;height:5px;width:' + pctWidth + '%;"></div></div></td><td style="padding:4px 0;font-size:12px;font-weight:600;color:' + c + ';width:24px;text-align:right;">' + score + '</td></tr>';
    }).join("");

    var responsesHTML = '<div style="margin-top:20px;padding-top:16px;border-top:1px solid #2C2C2B;">' +
      '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8a8980;margin-bottom:12px;">Your responses</div>' +
      '<table style="width:100%;border-collapse:collapse;">' + qsHTML + '</table>' +
      '</div>';

    var scoreHeaderHTML = hideScores
      ? '<div style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8a8980;">' + cat.name + '</div>'
      : '<div style="font-size:32px;font-weight:600;color:#f0efea;">' + Math.round(cat.pct) + '%</div>' +
        '<div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:' + (tierColor[cat.tier] || "#D97757") + ';margin-top:4px;">' + getTierLabel(cat.tier) + '</div>' +
        '<div style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8a8980;margin-top:6px;">' + cat.name + '</div>';

    return '<div style="background:#1F1F1E;border:1px solid #2C2C2B;border-radius:16px;padding:28px 24px;margin-bottom:24px;">' +
      '<div style="text-align:center;margin-bottom:16px;">' +
      scoreHeaderHTML +
      '</div>' +
      '<p style="font-size:14px;line-height:1.75;color:#C3C2B7;margin-bottom:20px;text-align:center;">' + desc + '</p>' +
      responsesHTML +
      '</div>';
  }).join("");

  var summaryHTML = summaryLines.map(function(s, i) {
    return '<p style="font-size:14px;line-height:1.7;color:#C3C2B7;padding-left:14px;border-left:2px solid #b5613f;margin-bottom:12px;"><strong style="display:block;font-size:15px;font-weight:700;color:#EFEFEA;margin-bottom:4px;">' + catScores[i].name + '.</strong>' + s + '</p>';
  }).join("");

  var scoreOverview = "";
  if (!hideScores) {
    scoreOverview = '<table style="width:100%;margin:20px 0 28px;"><tr>';
    catScores.forEach(function(cat) {
      scoreOverview += '<td style="text-align:center;padding:8px;"><div style="font-size:14px;font-weight:600;color:#f0efea;">' + cat.name + '</div><div style="font-size:20px;font-weight:600;color:' + (tierColor[cat.tier] || "#D97757") + ';">' + Math.round(cat.pct) + '%</div></td>';
    });
    scoreOverview += '</tr><tr>';
    catScores.forEach(function(cat) {
      var col = tierColor[cat.tier] || "#D97757";
      scoreOverview += '<td style="padding:4px 8px;"><div style="background:#2C2C2B;border-radius:3px;height:8px;"><div style="background:' + col + ';border-radius:3px;height:8px;width:' + Math.round(cat.pct) + '%;"></div></div></td>';
    });
    scoreOverview += '</tr></table>';
  }

  var overallLineHTML = hideScores ? "" :
    '<div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:' + (tierColor[overallTier] || "#D97757") + ';">Overall: ' + Math.round(overallPct) + '% &middot; ' + getTierLabel(overallTier) + '</div>';

  return '<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Your equipped. Nervous System Assessment Results</title></head><body style="margin:0;padding:0;background:#2C2C2B;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;"><div style="max-width:600px;margin:0 auto;padding:32px 20px;"><div style="padding:20px 0 24px;border-bottom:1px solid #3a3a38;margin-bottom:32px;"><img src="' + LOGO_DATA_URI + '" alt="equipped." style="height:28px;width:auto;display:block;" /></div><div style="text-align:center;margin-bottom:24px;"><h1 style="color:#f0efea;font-size:24px;font-weight:500;margin:0 0 8px;letter-spacing:-0.02em;">' + userName + ', your current nervous system profile</h1>' + overallLineHTML + '</div>' + triangleBlock + scoreOverview + '<div style="margin-bottom:32px;">' + summaryHTML + '</div><div style="height:1px;background:#3a3a38;margin:32px 0;"></div>' + categoryBlocks + '<div style="text-align:center;padding:32px 24px;background:#1F1F1E;border:1px solid #3a3a38;border-radius:16px;margin-bottom:24px;"><h2 style="color:#f0efea;font-size:20px;font-weight:500;margin:0 0 12px;letter-spacing:-0.02em;">Ready to train your nervous system?</h2><p style="color:#C3C2B7;line-height:1.7;margin:0 0 20px;font-size:14px;">Whether you are waking up to what is possible or fine tuning an already strong practice, equipped. has sessions, coaching, and programmes designed to move the needle on Notice, Shift, and Expand.</p><a href="https://weareequipped.com" style="display:inline-block;padding:14px 36px;background:#D97757;color:#fff;font-size:15px;font-weight:600;border-radius:10px;text-decoration:none;">Explore equipped.</a></div><div style="text-align:center;padding:16px 0;"><p style="font-size:12px;color:#5c5b54;font-style:italic;margin:0;">This assessment is original to equipped. Grounded in polyvagal theory, somatic experiencing, interoception science, and the window of tolerance model.</p></div></div></body></html>';
}

// Netlify Function handler — CommonJS export, zero dependencies
exports.handler = async function(event) {
  console.log("Function called, method:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    var body = JSON.parse(event.body);
    var name = body.name;
    var email = body.email;
    var answers = body.answers;
    var hideScores = !!body.hideScores;

    if (!name || !email || !answers) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields: name, email, answers" }) };
    }

    var apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "RESEND_API_KEY not configured" }) };
    }

    // Calculate scores
    var cats = ["notice", "shift", "expand"];
    var catScores = cats.map(function(catId) {
      var catQs = questionMeta.filter(function(q) { return q.category === catId; });
      var scores = catQs.map(function(q) { return answers[q.id] || 0; });
      var avg = scores.reduce(function(a, b) { return a + b; }, 0) / scores.length;
      var pct = (avg / 10) * 100;
      return { id: catId, name: categoryNames[catId], pct: pct, tier: getTier(pct), questions: catQs };
    });

    var allScores = questionMeta.map(function(q) { return answers[q.id] || 0; });
    var overallAvg = allScores.reduce(function(a, b) { return a + b; }, 0) / allScores.length;
    var overallPct = (overallAvg / 10) * 100;
    var overallTier = getTier(overallPct);

    var summaryLines = generateSummary(catScores[0].pct, catScores[1].pct, catScores[2].pct);

    var html = buildEmailHTML({
      userName: name,
      answers: answers,
      catScores: catScores,
      overallPct: overallPct,
      overallTier: overallTier,
      summaryLines: summaryLines,
      hideScores: hideScores,
    });

    // Call Resend REST API directly
    var response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "equipped. <hello@equipped.to>",
        to: [email],
        subject: name + ", your equipped. Nervous System Assessment results",
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
