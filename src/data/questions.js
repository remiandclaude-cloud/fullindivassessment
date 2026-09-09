export const categories = [
  {
    id: "notice",
    name: "Notice",
    description:
      "Can you read what's happening inside you? These nine questions measure your capacity to detect signals from your body, breath, emotions, and environment. The sensory foundation that makes all regulation possible.",
    scaleAnchors: {
      low: "Rarely / Almost never",
      mid: "Sometimes",
      high: "Consistently / With ease",
    },
  },
  {
    id: "shift",
    name: "Shift",
    description:
      "Can you change what's happening inside you? These nine questions measure your ability to deliberately move between states. Down regulating from activation, up regulating from flatness, recovering from stress, and responding instead of reacting.",
    scaleAnchors: {
      low: "Rarely / I can't",
      mid: "Sometimes / It takes effort",
      high: "Reliably / On demand",
    },
  },
  {
    id: "expand",
    name: "Expand",
    description:
      "Are you growing? These nine questions measure your appetite for self confrontation and growth. Your willingness to receive feedback, have hard conversations, reflect honestly, deconstruct your own patterns, and stretch yourself into emotionally challenging territory.",
    scaleAnchors: {
      low: "Rarely / Not yet",
      mid: "Working on it",
      high: "This is part of how I live",
    },
  },
];

export const questions = [
  // ── NOTICE ──
  {
    id: "N1", category: "notice",
    title: "Body Signals",
    text: "I can feel what's happening in my body throughout the day. Tension, fatigue, lightness, constriction. Without needing to stop and check.",
  },
  {
    id: "N2", category: "notice",
    title: "Breath Patterns",
    text: "I notice when my breathing changes. When it gets shallow, when I hold it, when it deepens. As it's happening, not after.",
  },
  {
    id: "N3", category: "notice",
    title: "Emotional Signatures",
    text: "When an emotion arrives, I can feel where it lives in my body. A tight chest, a heavy stomach, a buzzing in my hands. Before I name the emotion itself.",
  },
  {
    id: "N4", category: "notice",
    title: "State Recognition",
    text: "I can tell the difference between being activated (wired, on edge, heart racing), settled (calm, present, grounded), and shut down (flat, numb, checked out). And I know which one I'm in right now.",
  },
  {
    id: "N5", category: "notice",
    title: "Early Warning",
    text: "I catch the first signs of stress or overwhelm early. A subtle shift in my breathing, a change in my posture, a tightening somewhere. Before it builds into something bigger.",
  },
  {
    id: "N6", category: "notice",
    title: "Hunger and Fatigue",
    text: "I notice when my body is genuinely hungry, thirsty, or tired. And I can distinguish those signals from boredom, stress, or habit.",
  },
  {
    id: "N7", category: "notice",
    title: "Heart Rhythm",
    text: "I can feel my heartbeat without touching my chest. I notice when it speeds up or slows down in response to what's happening around me.",
  },
  {
    id: "N8", category: "notice",
    title: "Room Reading",
    text: "When I walk into a room, a meeting, a social gathering, a new space, I notice how the environment lands in my body. I can sense whether a space feels safe or activating before I think about it.",
  },
  {
    id: "N9", category: "notice",
    title: "After Effects",
    text: "After a conversation, a meeting, or an experience, I notice how it's left my body feeling. Energised, drained, unsettled, calm. Rather than just moving on to the next thing.",
  },

  // ── SHIFT ──
  {
    id: "S1", category: "shift",
    title: "Down Regulation",
    text: "When I'm activated, stressed, anxious, wired, I have reliable tools (breath, movement, body based practices) that I can use to return to calm within minutes.",
  },
  {
    id: "S2", category: "shift",
    title: "Up Regulation",
    text: "When I'm flat, sluggish, or low energy, I can deliberately shift into a more alert and engaged state without relying on caffeine or stimulants.",
  },
  {
    id: "S3", category: "shift",
    title: "Breath as a Tool",
    text: "I use my breath intentionally as a regulation tool. Not just noticing it, but actively changing the pattern (lengthening the exhale, slowing the pace, using holds) to shift my state.",
  },
  {
    id: "S4", category: "shift",
    title: "Recovery",
    text: "After a stressful event, a difficult conversation, a high pressure day, an unexpected setback, my body returns to a settled baseline relatively quickly. The stress doesn't linger for hours or days.",
  },
  {
    id: "S5", category: "shift",
    title: "Staying Unstuck",
    text: "When I get stuck in a state, ruminating, anxious, shut down, angry, I can usually find a way to move through it rather than staying trapped.",
  },
  {
    id: "S6", category: "shift",
    title: "Response Over Reaction",
    text: "In moments of conflict or interpersonal tension, I can pause before reacting. I respond from a regulated place rather than firing off from activation.",
  },
  {
    id: "S7", category: "shift",
    title: "Substance Independence",
    text: "I don't need alcohol, cannabis, food, scrolling, or other external inputs to come down at the end of the day. I can settle my system on my own.",
  },
  {
    id: "S8", category: "shift",
    title: "Pressure Performance",
    text: "Under pressure, a deadline, a presentation, a high stakes moment, I can access a state of focused calm rather than tipping into overwhelm or freeze.",
  },
  {
    id: "S9", category: "shift",
    title: "Sleep Transition",
    text: "When I get into bed, I can let go of the day. My body shifts from wakefulness into rest without fighting it. I don't lie awake replaying or planning.",
  },

  // ── EXPAND ──
  {
    id: "E1", category: "expand",
    title: "Discomfort Tolerance",
    text: "When I feel emotional pain, physical discomfort, or an uncomfortable sensation, I can stay with it. I don't immediately reach for a distraction, a substance, or an escape.",
  },
  {
    id: "E2", category: "expand",
    title: "Receiving Feedback",
    text: "When someone gives me honest feedback about my behaviour, my impact, my blind spots, I can take it in without shutting down, getting defensive, or dismissing it. My body stays regulated enough to actually hear what's being said.",
  },
  {
    id: "E3", category: "expand",
    title: "Implementing Feedback",
    text: "When I receive feedback that rings true, I do something with it. I don't just acknowledge it and move on. I change my behaviour, adjust my approach, and follow through.",
  },
  {
    id: "E4", category: "expand",
    title: "Hard Conversations",
    text: "I have an appetite for the conversations most people avoid. Addressing tension, naming what's not working, saying the thing that needs to be said. I initiate them rather than waiting for the other person or letting it fester.",
  },
  {
    id: "E5", category: "expand",
    title: "Circling Back",
    text: "When I've done something wrong, reacted poorly, or missed the mark with someone, I go back. I name what happened, take ownership, and repair. Even when it's uncomfortable and even when time has passed.",
  },
  {
    id: "E6", category: "expand",
    title: "Self Reflection",
    text: "I regularly and honestly examine my own patterns, reactions, and behaviours. Not to beat myself up, but to understand. I ask myself hard questions and I sit with the answers.",
  },
  {
    id: "E7", category: "expand",
    title: "Emotional Stretch",
    text: "I put myself in emotionally challenging situations on purpose. Vulnerability, exposure, depth. Because I know that my capacity grows at the edge, not in the centre. I don't just tolerate discomfort, I seek it.",
  },
  {
    id: "E8", category: "expand",
    title: "Self Deconstruction",
    text: "I'm willing to take apart my own stories, assumptions, and identities. Even the ones that feel foundational. When I notice a belief or a pattern that no longer serves me, I can let it go rather than defending it.",
  },
  {
    id: "E9", category: "expand",
    title: "Raising the Floor",
    text: "Over the past 6 months, my baseline has genuinely shifted. I handle things now that would have overwhelmed me before. My window of tolerance is wider than it used to be. And I can see the evidence in how I live.",
  },
];
