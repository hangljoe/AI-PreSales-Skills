---
name: linkedin-post
version: "1.1"
last_updated: 2026-09-28
description: "Writes LinkedIn posts from your own PreSales experience (handbook ch. 21, personal branding): short intake on topic, audience, goal and your VOICE.md, a confidentiality check on customer names and numbers, then a post in your voice. Use on \"write a LinkedIn post\", \"LinkedIn post about\", \"turn this win into a post\", \"repurpose this for LinkedIn\". Siblings: humanize (strip AI tells from an existing draft), field-comms-writer (1:1 customer emails). SKIP for long-form articles and marketing campaigns."
triggers:
  - "write a LinkedIn post"
  - "LinkedIn post about"
  - "turn this into a post"
  - "help me post about"
  - "create a LinkedIn post"
  - "LinkedIn content"
  - "repurpose this for LinkedIn"
  - "make a LinkedIn post"
---

# LinkedIn Post Creator

Create LinkedIn posts that sound like you, not like a template.

Grounded in *The PreSales Handbook* ch. 21 (Personal Branding for the PreSales Professional): your online presence is part of your personal brand. Share trends, takeaways from events and success stories to show expertise and give back to the community, not to broadcast. Read ch. 21 in `${CLAUDE_PLUGIN_ROOT}/references/PreSales_Handbook_Reference.md` if the user wants the reasoning behind a post; the full book is available at www.presales-handbook.com.

---

## Step 1 — Intake (before drafting)

Ask these in one short message, and skip any the user has already answered:
1. **Topic** — what happened or what do you want to say? Paste the source material if there is any (debrief, notes, win/loss).
2. **Audience** — who should read this? (e.g. fellow SCs, PreSales leaders, buyers in your industry, hiring managers)
3. **Goal** — what should the post do for you? (share a lesson, start a conversation, show expertise in a topic, support a launch or event)
4. **Your voice** — check whether a `VOICE.md` exists (built by `/presales:brain:voice`, in the user's second-brain folder). If it exists, read it and follow it; it overrides the generic voice rules below. If not, ask for one or two past posts the user liked writing, or continue with the style guide.

## Step 2 — Confidentiality check (before drafting)

A post is public and permanent. Before writing, scan the topic and source material for:
- Customer or prospect names, logos, or details that identify them (industry + city + size is often enough)
- Quotes from customer staff
- Deal numbers: contract value, pricing, discounts, volumes, ROI figures from a specific customer
- Deal details: competitors in the deal, timelines, internal politics, why someone lost
- Your employer's unreleased products, roadmap or internal metrics

**Default: anonymise.** Write "a mid-market software company" instead of the name, round or remove customer numbers, and paraphrase instead of quoting.
Keep an identifying detail only if the user confirms written consent from the customer (e.g. a published case study or signed reference agreement) and that no NDA or employer social-media policy forbids it. If the user is unsure, anonymise and say so in one line.

List every detail you anonymised or removed after the draft, so the user can check it.

## Philosophy

**What makes content resonate:**
- **Specificity**: Concrete details that couldn't be templated (dates, numbers, names, tools)
- **Voice**: Your actual way of speaking, not prescribed phrases
- **Genuine intent**: Sharing because you have something to say
- **Earned insight**: Lessons from actual experience, not theory
- **Personal stakes**: Show you're bought in — enthusiasm or scepticism signals you care

**What kills content:**
- Templates and formulas (readers pattern-match instantly)
- Prescribed phrases ("Here's the truth...", "I learned this the hard way...")
- Engagement bait CTAs
- Performative vulnerability (struggle that exists to contrast with success)
- Abstract advice without grounding in real experience

See `${CLAUDE_PLUGIN_ROOT}/skills/linkedin-post/references/style-guide.md` for the full voice & tone guide with examples.

---

## Content Modes

Instead of templates, start with intent. What are you trying to do?

### Story
You experienced something. You're sharing what happened.
- Starts in a specific moment with real details
- Includes the messy middle, not just failure → success
- Details that couldn't be made up (dates, numbers, what people actually said)

**Kills it:** Hero's journey arc, performative vulnerability, generic takeaway.

### Observation
You noticed something others might miss.
- Grounded in something specific (a product launch, conversation, data point)
- Your interpretation adds value beyond reporting
- Can be short — 3-4 sentences is enough

**Kills it:** Obvious observations framed as unique insights.

### Take
You believe something and want to explain why.
- You actually believe it (not contrarian for engagement)
- You explain your reasoning, not just assert
- Acknowledges complexity and where you might be wrong

**Kills it:** "Unpopular opinion:" as an opener, contrarian positioning without substance.

### Teach
You know how to do something specific.
- You've actually done this thing, recently, in a real context
- Steps are specific and actionable
- Acknowledges edge cases or where it might not work

**Kills it:** Abstract frameworks, teaching things you've only read about.

### React
You're responding to something happening in the world.
- Timely — responding to something recent and relevant
- Adds your perspective beyond just summarising
- Your angle on the news, not just the news

**Kills it:** Hot takes without substance, jumping on trends for visibility.

### Ask
You genuinely want to learn something from your audience.
- You actually don't know the answer
- Question is specific enough to get useful responses

**Kills it:** Rhetorical questions disguised as engagement bait.

---

## Universal Requirements

### Specificity
Every post needs at least 2 concrete details:
- A date or timeframe ("Last March", "three weeks ago")
- A number from your own work ("14 discovery calls this quarter", "a 40-minute demo cut to 25")
- A name you are allowed to use (a tool, a public event, a colleague who agreed; customers only with consent, see Step 2)
- A quote (something someone actually said; paraphrase customer staff unless they consented)
- A specific context (which kind of deal, which phase, which kind of buyer)

If you can't include specifics, ask: is this based on real experience or am I abstracting?

### Experience Attribution
Be clear about what's yours vs. secondhand:
- **Own experience:** "I tested X and found Y"
- **Secondhand:** "A colleague on our RFP team found X in her testing" (name them only with their OK)

### Voice Check
Before finalising, ask:
- "Would I say this exact phrase out loud to a colleague?"
- "Does this sound like me or like a LinkedIn post?"
- "Am I using any phrases I've seen in template guides?"

**Conversational markers are features, not bugs:**
- Parenthetical asides: "(and you should be)", "(at least in my experience)"
- Natural qualifiers: "something like", "generally", "typically", "of course"
- Honest admissions: "haven't gotten around to testing"

### Length
Say what needs to be said. Stop when done. 1,200–1,800 characters is a reasonable range, but length should follow content — don't pad, don't compress if more detail serves the reader.

### Endings
End with a value reveal, not a summary.
- "Trying the same opening on my next three discovery calls to see if it holds"
- "Testing this on the next deal to validate"
- Or just stop — often the best ending is no ending.

**Bad endings:** "Agree or disagree?" / "What would you add?" / "Thoughts?" (engagement bait)

---

## Anti-Patterns

### Structural Signals (Readers See These Instantly)
- Emoji at beginning and/or end of post
- Perfectly parallel bullet structures
- "Broetry" format (single sentence per line, every line)
- Hook + body + CTA structure that's visibly templated

### Rhythm Tells
**Em dashes are an LLM giveaway.** Avoid entirely. Use commas, parentheses, or restructure.

**Over-punchy staccato rhythm is equally suspicious.** One punchy moment per post is good — a whole post that reads like staccato punches signals inauthenticity.

### AI/Template Phrases (Kill These)
- "I'm thrilled/excited to announce"
- "Here's what I learned:" / "Here's the thing..."
- "The lesson?" / "Let me break this down"
- "This changed everything" / "Game-changing" / "Deep dive"
- "Unpack" / "At the end of the day"
- "It's not about X, it's about Y"
- "Contrarian take:" / "Unpopular opinion:" / "Hot take:"

### Engagement Bait
- "Agree or disagree?"
- "What would you add?"
- "Which one are you trying first?"
- "Like if you...", "Share with someone who...", "Tag a friend who..."

---

## Formatting
- Short paragraphs (1-2 sentences each)
- Line breaks for readability
- No hashtags
- **No external links in the post body.** Put the URL in the first comment so the post stands on its own.
- Don't use bold or symbols performatively — only when they genuinely aid reading

---

## Repurposing Long-Form Content

When turning a discovery call summary, demo debrief, or win/loss into a post:

**Do:**
- Follow the same core argument from the source — the post should make the same points
- Make the post fully standalone — the reader gets complete value without clicking anything
- Adapt pacing and depth for LinkedIn (tighter, fewer examples) but keep the same framing and conclusions

**Don't:**
- Summarise the whole piece into a bland overview — pick the argument thread and follow it
- Write "Just posted a debrief about..."
- Make the post a teaser with no standalone value
- Include any external links in the post body
- Carry over customer names, numbers or quotes from the source without the Step 2 check
