import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  CircleDot,
  Eye,
  Fingerprint,
  HeartHandshake,
  MessageCircle,
  MoveRight,
  RefreshCw,
  Shield,
  Sparkles,
  Target,
  Waypoints,
} from "lucide-react";
import {
  colorClasses,
  coreScenarios,
  metrics,
  platformGaps,
  productPrinciples,
  reflectionStarters,
  visibilityOptions,
  voiceTypes,
} from "./productData";
import { MobileAppPrototype } from "./MobileAppPrototype";
import "./styles.css";

function SectionIntro({ eyebrow, title, children, align = "center", invert = false }) {
  return (
    <div
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-[0.28em] text-clay uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-semibold tracking-tight sm:text-4xl ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">
        {children}
      </div>
    </div>
  );
}

function PrincipleChip({ children }) {
  return (
    <span className="rounded-full border border-stone-300/80 bg-white/70 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm shadow-stone-200/50 backdrop-blur">
      {children}
    </span>
  );
}

function PrimaryButton({ children, href, tone = "dark" }) {
  const toneClass =
    tone === "light"
      ? "bg-white text-ink hover:bg-stone-100 focus:ring-white"
      : "bg-ink text-white hover:bg-stone-800 focus:ring-ink";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-panel transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${toneClass}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

function SecondaryButton({ children, href }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-stone-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2"
    >
      {children}
    </a>
  );
}

function Header({ onOpenApp }) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-paper/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="标签墙首页">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-sm font-semibold text-white">
            墙
          </span>
          <span className="text-base font-semibold tracking-tight text-ink">
            标签墙
          </span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
          <a href="#spectrum" className="transition hover:text-ink">
            声音光谱
          </a>
          <a href="#for-me" className="transition hover:text-ink">
            为我而答
          </a>
          <a href="#metrics" className="transition hover:text-ink">
            健康指标
          </a>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#spectrum"
            className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm shadow-stone-200 transition hover:bg-stone-50 sm:inline-flex"
          >
            查看机制
            <MoveRight size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onOpenApp}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800"
          >
            App 版
            <MoveRight size={15} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="absolute -left-6 top-10 hidden h-36 w-36 rounded-full bg-rosevoice/20 blur-3xl sm:block" />
      <div className="absolute -right-8 bottom-6 hidden h-44 w-44 rounded-full bg-violetvoice/20 blur-3xl sm:block" />
      <div className="relative overflow-hidden rounded-lg border border-white/70 bg-white shadow-soft">
        <img
          src="/voice-wall-hero.png"
          alt="由多张纸质标签组成的温暖声音墙视觉"
          className="h-56 w-full object-cover sm:h-64"
        />
        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <p className="text-sm font-semibold text-stone-500">
              @匿名声音 · #职场 #选择
            </p>
            <p className="mt-3 text-lg font-medium leading-8 text-ink">
              工作两年了，要不要回老家？北京压力大，但回去又怕没机会，最近每天都失眠。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {voiceTypes.map((voice) => {
              const colors = colorClasses[voice.colorName];
              return (
                <div
                  key={voice.id}
                  className={`rounded-lg border ${colors.border} ${colors.soft} p-3`}
                >
                  <div className={`h-1.5 rounded-full ${colors.bg}`} />
                  <p className={`mt-3 text-sm font-semibold ${colors.text}`}>
                    {voice.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-stone-500">
                    {voice.claim}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 left-8 right-8 rounded-lg border border-stone-200 bg-white/90 p-4 shadow-panel backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-ink">这里不按赞数排序</span>
          <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-semibold text-clay">
            每种声音都有位置
          </span>
        </div>
      </div>
    </div>
  );
}

function Hero({ onOpenApp }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-24 pt-16 sm:px-8 sm:pb-28 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(circle_at_top_left,rgba(215,91,130,0.17),transparent_30%),radial-gradient(circle_at_top_right,rgba(127,103,199,0.16),transparent_26%),linear-gradient(180deg,#f8f3eb_0%,#fffaf3_64%,#f8f3eb_100%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.92fr]">
        <div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            标签墙·求助
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-stone-700 sm:text-2xl sm:leading-10">
            一个让不同的声音都被看见的求助空间。不评出「最优答案」，也不让点赞数决定谁被看见。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {productPrinciples.map((principle) => (
              <PrincipleChip key={principle}>{principle}</PrincipleChip>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="#spectrum">理解声音光谱</PrimaryButton>
            <SecondaryButton href="#scenarios">查看核心场景</SecondaryButton>
            <button
              type="button"
              onClick={onOpenApp}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-stone-400 hover:bg-white focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2"
            >
              打开移动 App 版
              <MoveRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <HeroPreview />
      </div>
    </section>
  );
}

function GapSection() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="产品缺口"
          title="不是再做一个评论区，而是修正评论区的默认规则"
        >
          <p>
            熟人场域让人收着说，热度排序让人只看见多数派，纯树洞又容易没有回声。标签墙·求助要同时提供温度感、多元声音和匿名安全网。
          </p>
        </SectionIntro>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {platformGaps.map((item) => (
            <article
              key={item.name}
              className="rounded-lg border border-stone-200 bg-white p-7 shadow-sm"
            >
              <CircleDot className="h-6 w-6 text-clay" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-semibold text-ink">{item.name}</h3>
              <p className="mt-4 leading-7 text-stone-600">{item.problem}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScenarioCard({ scenario, index }) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-panel">
      <span className="text-sm font-semibold text-clay">
        0{index + 1}
      </span>
      <h3 className="mt-5 text-2xl font-semibold text-ink">{scenario.title}</h3>
      <p className="mt-5 text-xl leading-8 text-stone-800">
        「{scenario.question}」
      </p>
      <p className="mt-6 leading-7 text-stone-600">{scenario.need}</p>
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-clay transition group-hover:scale-x-100" />
    </article>
  );
}

function ScenariosSection() {
  return (
    <section id="scenarios" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="核心场景"
          title="同一个求助空间，需要接住三种完全不同的需要"
        >
          <p>
            有些问题需要判断，有些问题需要陪伴，有些问题需要经验。声音光谱的价值，是让它们不互相挤压。
          </p>
        </SectionIntro>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {coreScenarios.map((scenario, index) => (
            <ScenarioCard key={scenario.title} scenario={scenario} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceSpectrum() {
  const [selectedVoiceType, setSelectedVoiceType] = useState(voiceTypes[1].id);
  const selectedVoice = useMemo(
    () => voiceTypes.find((voice) => voice.id === selectedVoiceType),
    [selectedVoiceType],
  );
  const selectedColors = colorClasses[selectedVoice.colorName];

  return (
    <section id="spectrum" className="px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
        <div>
          <SectionIntro
            align="left"
            eyebrow="声音光谱"
            title="三类声音并列存在，不让热度替用户做选择"
          >
            <p>
              「共鸣 / 建议 / 反观」不是支持、反对、中立。它们代表回答者的响应方式：陪伴、提供方法，或者给出另一面。
            </p>
          </SectionIntro>
          <div className="mt-9 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-stone-500">
              产品规则
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
              {[
                "三类声音必须并列存在。",
                "不用点赞数排序决定展示优先级。",
                "少数声音也应该保留独立位置。",
              ].map((rule) => (
                <li key={rule} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-soft sm:p-6">
          <div className="grid grid-cols-3 gap-3">
            {voiceTypes.map((voice) => {
              const colors = colorClasses[voice.colorName];
              const isSelected = voice.id === selectedVoiceType;
              return (
                <button
                  key={voice.id}
                  type="button"
                  onClick={() => setSelectedVoiceType(voice.id)}
                  className={`rounded-lg border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2 ${
                    isSelected
                      ? `${colors.border} ${colors.soft}`
                      : "border-stone-200 bg-stone-50 hover:bg-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div
                    className={`h-2 rounded-full ${
                      isSelected ? colors.bg : "bg-stone-300"
                    }`}
                  />
                  <p
                    className={`mt-4 text-lg font-semibold ${
                      isSelected ? colors.text : "text-stone-700"
                    }`}
                  >
                    {voice.label}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">{voice.claim}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg border border-stone-200 bg-paper/60 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={`text-sm font-semibold ${selectedColors.text}`}>
                  {selectedVoice.label} · {selectedVoice.claim}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {selectedVoice.tone}
                </p>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-stone-600 shadow-sm">
                按时间看见，不按热度淘汰
              </span>
            </div>
            <article className="mt-5 rounded-lg bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-stone-500">
                @匿名声音
              </p>
              <p className="mt-4 leading-8 text-stone-800">
                {selectedVoice.answer}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ForMeSection() {
  const [isInspired, setIsInspired] = useState(true);
  const [reflectionStarter, setReflectionStarter] = useState("我打算");

  return (
    <section id="for-me" className="bg-ink px-5 py-24 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
        <div>
          <SectionIntro
            align="left"
            invert
            eyebrow="为我而答"
            title="把公开点赞换成求助者自己的真实回声"
          >
            <p className="text-stone-300">
              「对我有启发」不是把某条回答推上榜首，而是让求助者表达：这条声音真的影响到了我。
            </p>
          </SectionIntro>
          <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              {
                icon: Eye,
                title: "私有勾选",
                text: "只有求助者本人能表达启发感。",
              },
              {
                icon: RefreshCw,
                title: "写下复盘",
                text: "不是答案总结，而是阶段性变化。",
              },
              {
                icon: MessageCircle,
                title: "声音被看见",
                text: "回答者收到真实反馈，而不是热度反馈。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/7 p-5"
              >
                <item.icon className="h-5 w-5 text-orangevoice" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-soft backdrop-blur sm:p-6">
          <div className="rounded-lg bg-white p-5 text-ink">
            <p className="text-sm font-semibold text-stone-500">
              @小王 · 建议
            </p>
            <p className="mt-4 leading-8 text-stone-800">
              重要的不是城市，是你想过怎样的生活。你可以给自己一段真实试错的时间，而不是只在想象里比较。
            </p>
            <button
              type="button"
              onClick={() => setIsInspired((value) => !value)}
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orangevoice focus:ring-offset-2 ${
                isInspired
                  ? "bg-orangevoice text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
              aria-pressed={isInspired}
            >
              <Sparkles size={16} aria-hidden="true" />
              {isInspired ? "已标记：对我有启发" : "标记为对我有启发"}
            </button>
          </div>

          <div className="mt-5 rounded-lg bg-paper p-5 text-ink">
            <p className="text-sm font-semibold text-stone-500">
              复盘开头
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {reflectionStarters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => setReflectionStarter(starter)}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2 ${
                    reflectionStarter === starter
                      ? "bg-ink text-white"
                      : "bg-white text-stone-600 hover:text-ink"
                  }`}
                  aria-pressed={reflectionStarter === starter}
                >
                  {starter}
                </button>
              ))}
            </div>
            <p className="mt-5 rounded-lg bg-white p-4 leading-8 text-stone-800">
              <span className="font-semibold text-clay">{reflectionStarter}</span>
              {" "}先在北京再撑一年，同时回老家面试两家公司。给自己一个真实的对比，而不是只靠想象做决定。
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-lg bg-orangevoice/10 p-4 text-sm font-semibold text-clay">
              <HeartHandshake size={18} aria-hidden="true" />
              你的声音被看见了
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IdentitySection() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="表达安全网"
          title="匿名和可见范围，是让真实声音出现的基础设施"
        >
          <p>
            默认「标签广场 + 匿名声音」：用匿名降低表达成本，用标签广场打开差异来源。
          </p>
        </SectionIntro>
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-stone-200 bg-white p-7 shadow-sm">
            <Fingerprint className="h-7 w-7 text-clay" aria-hidden="true" />
            <h3 className="mt-6 text-2xl font-semibold text-ink">匿名声音优先</h3>
            <p className="mt-4 leading-8 text-stone-600">
              匿名不是附属开关，而是一等表达方式。它让不敢用真名说的话，也能进入一个更安全的公共空间。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {visibilityOptions.map((option) => (
              <article
                key={option.title}
                className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
              >
                <Shield className="h-6 w-6 text-clay" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-ink">
                  {option.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {option.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section id="metrics" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <SectionIntro
            align="left"
            eyebrow="健康指标"
            title="这个产品不能只看增长，还要看差异有没有被保住"
          >
            <p>
              如果启发只集中在「建议」，如果少数声音开始消失，产品就可能退化成另一个热度筛选平台。
            </p>
          </SectionIntro>
          <div className="rounded-lg bg-ink p-6 text-white shadow-soft">
            <div className="flex items-start gap-4">
              <Waypoints className="mt-1 h-6 w-6 text-orangevoice" />
              <p className="text-xl font-semibold leading-8">
                Voice & Difference 的健康度，要看不同声音是否真的还在场。
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-lg border border-stone-200 bg-paper/70 p-5"
            >
              <p className="text-sm font-semibold text-clay">{metric.label}</p>
              <p className="mt-4 text-sm leading-6 text-stone-700">
                {metric.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-ink p-8 text-white shadow-soft sm:p-12 lg:p-16">
        <div className="max-w-3xl">
          <Target className="h-8 w-8 text-orangevoice" aria-hidden="true" />
          <h2 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
            你不是从答案里选了一个赢家，而是看见了更多可能。
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-300">
            标签墙·求助把声音从排行榜里拿出来，让共鸣、建议和反观都有各自的位置。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="#top" tone="light">
              回到顶部
            </PrimaryButton>
            <SecondaryButton href="#for-me">查看反馈闭环</SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcasePage({ onOpenApp }) {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Header onOpenApp={onOpenApp} />
      <main>
        <Hero onOpenApp={onOpenApp} />
        <GapSection />
        <ScenariosSection />
        <VoiceSpectrum />
        <ForMeSection />
        <IdentitySection />
        <MetricsSection />
        <ClosingSection />
      </main>
    </div>
  );
}

function getInitialVersion() {
  return window.location.hash === "#app" ? "mobile-app" : "showcase";
}

function App() {
  const [activeVersion, setActiveVersion] = useState(getInitialVersion);

  const openMobileApp = () => {
    window.location.hash = "app";
    setActiveVersion("mobile-app");
  };

  const openShowcase = () => {
    window.location.hash = "showcase";
    setActiveVersion("showcase");
  };

  if (activeVersion === "mobile-app") {
    return <MobileAppPrototype onBackToShowcase={openShowcase} />;
  }

  return <ShowcasePage onOpenApp={openMobileApp} />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
