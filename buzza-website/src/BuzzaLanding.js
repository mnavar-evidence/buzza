import React from 'react';

const headerLogo = `${process.env.PUBLIC_URL}/images/buzza-white-logo.png`;

const navigation = [
  { label: 'Overview', href: '#overview' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Plans', href: '#plans' },
  { label: 'FAQ', href: '#faq' },
];

const BuzzaLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-green-500 text-white sticky top-0 z-10 shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-2xl font-bold">
            <img
              src={headerLogo}
              alt="Buzza logo"
              className="h-8 w-auto"
            />
            Buzza
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a className="hover:underline" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#get-started"
            className="bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
          >
            Join Early Access
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
        <section id="overview" className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="uppercase tracking-wide text-sm text-green-600 font-semibold mb-2">
              Conversational Clover Insights
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Talk to your data. Act on it instantly.
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Buzza is the ChatGPT App extension of your Clover stack. It lets restaurateurs ask plain-language questions like “Hey Buzza, what’s my best-selling dish today?” and receive instant insight, follow-up suggestions, and marketing actions without reopening dashboards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#demo-mode"
                className="bg-green-500 text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-green-600"
              >
                Explore the Demo Mode
              </a>
              <a
                href="#plans"
                className="border border-green-500 text-green-600 px-6 py-3 rounded-md font-semibold text-center hover:bg-green-50"
              >
                Compare Plans
              </a>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Why Clover Merchants Need This</h2>
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong>Declining engagement:</strong> Most installs never return to dashboards after onboarding.
              </li>
              <li>
                <strong>Fragmented tooling:</strong> Legacy MarketBuzz, BeSocial, UMarket, and Unlock Insights experiences felt like separate workflows.
              </li>
              <li>
                <strong>Momentum shift:</strong> Owners already use ChatGPT for copywriting—now their business data meets them there.
              </li>
            </ul>
          </div>
        </section>

        <section id="how-it-works" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">A new engagement loop</h2>
            <p className="text-gray-700">
              Buzza turns passive analytics into an active co-pilot. Signals trigger nudges, merchants ask questions, and suggested actions launch without leaving the conversation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Connect or Demo',
                copy: 'Start in demo mode or authenticate with Clover OAuth to unlock real-time insights.',
              },
              {
                step: '2',
                title: 'Ask Anything',
                copy: '“How were my weekend sales?” “Should I close early today?” Natural language or voice.',
              },
              {
                step: '3',
                title: 'Get Context',
                copy: 'The assistant surfaces sales deltas, guest segments, and predicted demand shifts.',
              },
              {
                step: '4',
                title: 'Take Action',
                copy: 'Generate SMS/email drafts, schedule nudges, or assign follow-up tasks instantly.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl shadow p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold text-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="use-cases" className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Illustrative conversations</h2>
            <p className="text-gray-700">
              Real-world prompts from restaurants, cafes, and food trucks show how Buzza keeps owners engaged and decisive.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong>“Buzza, how’s my week looking?”</strong> The assistant rolls up seven-day revenue, guest counts, and trend deltas with a recommended focus area.
              </li>
              <li>
                <strong>“Hey Buzza, what’s my best-selling dish today?”</strong> Buzza highlights the top items, margin contribution, and upsell prompts for staff.
              </li>
              <li>
                <strong>“Can you ask Buzza to draft a lunch promo?”</strong> A ready-to-send SMS is generated with recommended timing and audience filters.
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Proactive nudges keep the loop alive</h3>
            <p className="text-gray-600">
              Instead of waiting for merchants to log in, Buzza triggers contextual messages that open directly into ChatGPT.
            </p>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="border rounded-lg p-4">
                <p className="font-semibold text-green-600">SMS Nudge</p>
                <p>“Sales dipped 10% this week. Ask Buzza what to do.”</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-semibold text-green-600">Email Nudge</p>
                <p>“New to-go customers are not returning. Generate a win-back campaign in Buzza.”</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-semibold text-green-600">Dashboard Ping</p>
                <p>“AI spotted an opportunity: add a Monday lunch special to recover $480 this month.”</p>
              </div>
            </div>
          </div>
        </section>

        <section id="demo-mode" className="bg-white rounded-2xl shadow p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-3xl font-bold">Demo-first rollout</h2>
              <p className="text-gray-700">
                Launch the app with high-quality synthetic data so every Clover merchant can test value before connecting their account. Toggle to live data with one OAuth handshake.
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li>Anonymized sample cafe, restaurant, and food truck datasets</li>
                <li>Demo badge and upgrade path inside the chat experience</li>
                <li>Lead capture before enabling real customer data</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 space-y-3">
              <p className="uppercase text-xs tracking-wide text-green-700 font-semibold">Resources</p>
              <a href="/chatgpt-openapi.yaml" className="block text-green-700 font-semibold hover:underline">
                OpenAPI Spec &rsaquo;
              </a>
              <a href="/.well-known/ai-plugin.json" className="block text-green-700 font-semibold hover:underline">
                ChatGPT App Manifest &rsaquo;
              </a>
              <a href="/docs/buzza-blueprint.md" className="block text-green-700 font-semibold hover:underline">
                Blueprint Overview &rsaquo;
              </a>
            </div>
          </div>
        </section>

        <section id="plans" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Plans that match merchant maturity</h2>
            <p className="text-gray-700">Start free, upgrade when automated nudges and multi-location insights become essential.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Free',
                price: '$0',
                description: 'Best for exploring conversational insights.',
                benefits: [
                  '3 insight lookups per day',
                  '7-day history and demo dataset',
                  '3 campaign previews per month',
                ],
              },
              {
                name: 'Pro',
                price: '$29',
                description: 'Unlock predictive alerts and unlimited insights.',
                benefits: [
                  'Unlimited conversational insights',
                  'Predictive traffic and trend alerts',
                  'Smart send-time recommendations',
                ],
                highlighted: true,
              },
              {
                name: 'Growth',
                price: '$79',
                description: 'Designed for multi-location operators and agencies.',
                benefits: [
                  'Multi-location rollups',
                  'Automated nudges and campaigns',
                  'Advanced ROI analytics',
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 shadow-sm space-y-4 ${
                  plan.highlighted ? 'border-green-500 shadow-md bg-white' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <span className="text-xl font-bold text-green-600">{plan.price}/mo</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
                <ul className="space-y-2 text-gray-700 list-disc pl-6">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <a
                  href="#get-started"
                  className={`block text-center font-semibold px-4 py-2 rounded-md ${
                    plan.highlighted
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'border border-green-500 text-green-600 hover:bg-green-50'
                  }`}
                >
                  Join Waitlist
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Implementation roadmap</h2>
            <p className="text-gray-700">A four-sprint plan brings Buzza from concept to Clover relaunch.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                title: 'Sprint 1',
                focus: 'Foundation',
                detail: 'Mock APIs, manifest, landing, and beta cohort recruited.',
              },
              {
                title: 'Sprint 2',
                focus: 'Nudges',
                detail: 'Trigger text/email deep links with contextual insights.',
              },
              {
                title: 'Sprint 3',
                focus: 'Automation',
                detail: 'Campaign preview-to-send workflow and tier gating.',
              },
              {
                title: 'Sprint 4',
                focus: 'Analytics',
                detail: 'ROI dashboards, ML tuning, marketplace relaunch.',
              },
            ].map((stage) => (
              <div key={stage.title} className="bg-white rounded-xl shadow p-6 space-y-2">
                <p className="text-sm font-semibold text-green-600">{stage.title}</p>
                <h3 className="text-xl font-semibold">{stage.focus}</h3>
                <p className="text-gray-600">{stage.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
            <p className="text-gray-700">Answers for busy owners evaluating the leap into conversational AI.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'How do I switch from demo to live data?',
                a: 'Click “Connect Clover Data” in the ChatGPT App. OAuth completes in under a minute and your historical insights unlock instantly.',
              },
              {
                q: 'Is my customer data safe?',
                a: 'Yes. Buzza reuses your existing PCI-compliant infrastructure and stores tokens using the same encryption standards.',
              },
              {
                q: 'Do I need to install another Clover app?',
                a: 'No new install required. Buzza complements your current app, reusing the same authorization scope.',
              },
              {
                q: 'Can the assistant trigger real campaigns?',
                a: 'Growth tier members can push SMS/email campaigns directly from the chat once previews are approved.',
              },
              {
                q: 'How quickly will I see value?',
                a: 'Most merchants surface actionable insights in the first conversation thanks to pre-baked prompts and nudges.',
              },
              {
                q: 'What if I need human help?',
                a: 'Every recommendation is logged. Tap “Escalate to the Buzza team” inside the chat to request expert support.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl shadow p-6 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="get-started" className="bg-green-500 text-white rounded-2xl px-8 py-12 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to re-engage your Clover merchants?</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Rebrand your Clover presence as Buzza, invite merchants to the demo, and watch engagement rise as insights turn into action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@buzza.ai" className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
              Book a Strategy Session
            </a>
            <a
              href="https://buzza.ai/launch-checklist"
              className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-green-600/80"
            >
              Download Launch Checklist
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Buzza. All rights reserved.
      </footer>
    </div>
  );
};

export default BuzzaLanding;
