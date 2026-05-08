import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronRight,
  Compass,
  Eye,
  Home,
  Lock,
  MessageCircle,
  PenLine,
  Plus,
  Send,
  Shield,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";
import {
  answerDrafts,
  answersByVoice,
  colorClasses,
  composerTags,
  helpRequest,
  mobileFeedItems,
  mobileMessages,
  reflectionStarters,
  reflectionInspirations,
  totalVoiceCount,
  visibilityOptions,
  voiceCounts,
  voiceTypes,
} from "./productData";

const appTabs = [
  { id: "feed", label: "求助", icon: Home },
  { id: "messages", label: "消息", icon: MessageCircle },
  { id: "profile", label: "我的", icon: UserRound },
];

const messageIconComponents = {
  seen: Eye,
  reflection: MessageCircle,
};

function AppChrome({ children, activeScreen, onTabChange }) {
  const scrollContainerRef = useRef(null);
  const activeTab = ["messages", "profile"].includes(activeScreen)
    ? activeScreen
    : "feed";

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0 });
  }, [activeScreen]);

  return (
    <div className="relative flex h-screen w-full max-w-[430px] flex-col overflow-hidden bg-[#fbf7ef] shadow-soft sm:h-[min(828px,calc(100vh-116px))] sm:max-w-[387px] sm:rounded-[2rem] sm:border sm:border-stone-900/15">
      <div className="flex items-center justify-between px-6 pb-2 pt-4 text-xs font-semibold text-stone-800">
        <span>9:41</span>
        <span className="h-4 w-16 rounded-full bg-stone-900" aria-hidden="true" />
        <span>100%</span>
      </div>
      <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto pb-20">
        {children}
      </div>
      <nav className="absolute inset-x-0 bottom-0 border-t border-stone-200 bg-[#fbf7ef]/95 px-4 pb-4 pt-2 backdrop-blur">
        <div className="grid grid-cols-3 gap-2">
          {appTabs.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  selected ? "bg-ink text-white" : "text-stone-500 hover:bg-white"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function AppTopBar({ title, subtitle, leftAction, rightAction }) {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-[#fbf7ef]/95 px-5 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {leftAction}
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight text-ink">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-1 truncate text-xs font-medium text-stone-500">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
        {rightAction}
      </div>
    </header>
  );
}

function Tag({ children, selected = false }) {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        selected ? "bg-ink text-white" : "bg-white text-stone-600"
      }`}
    >
      #{children}
    </span>
  );
}

function VoiceMiniBars() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {voiceTypes.map((voice) => {
        const colors = colorClasses[voice.colorName];
        return (
          <div key={voice.id} className={`rounded-lg ${colors.soft} p-2`}>
            <div className={`h-1 rounded-full ${colors.bg}`} />
            <p className={`mt-2 text-[11px] font-semibold ${colors.text}`}>
              {voice.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function VoiceDistributionBar({ selectedVoiceType, onSelect }) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
      <div className="flex h-2 overflow-hidden rounded-full bg-stone-100">
        {voiceTypes.map((voice) => {
          const colors = colorClasses[voice.colorName];
          return (
            <span
              key={voice.id}
              className={colors.bg}
              style={{ flexGrow: voiceCounts[voice.id], flexBasis: 0 }}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {voiceTypes.map((voice) => {
          const colors = colorClasses[voice.colorName];
          const isSelected = selectedVoiceType === voice.id;
          return (
            <button
              key={voice.id}
              type="button"
              onClick={() => onSelect(voice.id)}
              className={`rounded-lg border p-3 text-left transition ${
                isSelected
                  ? `${colors.soft} ${colors.border}`
                  : "border-stone-200 bg-stone-50"
              }`}
              aria-pressed={isSelected}
            >
              <div className={`h-1.5 rounded-full ${colors.bg}`} />
              <p
                className={`mt-2 text-sm font-semibold ${
                  isSelected ? colors.text : "text-stone-700"
                }`}
              >
                {voice.label}
              </p>
              <p className="mt-1 text-[11px] text-stone-500">
                {voiceCounts[voice.id]} 个声音
              </p>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs font-medium leading-5 text-stone-500">
        按时间倒序展示 · 不按赞数 · 空桶也保留位置
      </p>
    </section>
  );
}

function VoicePresenceNote({ answerCount, voiceLabel }) {
  if (answerCount === 0) {
    return (
      <section className="rounded-lg border border-dashed border-stone-300 bg-white/70 p-5 text-center">
        <Sparkles className="mx-auto h-6 w-6 text-clay" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-ink">
          等待更多{voiceLabel}的声音
        </p>
        <p className="mt-2 text-xs leading-5 text-stone-500">
          这个视角同样重要，所以不会被隐藏，也不会被合并到其他桶。
        </p>
      </section>
    );
  }

  if (answerCount === 1) {
    return (
      <p className="rounded-lg bg-white/70 px-4 py-3 text-xs font-semibold leading-5 text-stone-500">
        这个立场的声音目前还少，但它依然拥有独立位置。
      </p>
    );
  }

  return null;
}

function AnswerCard({ answer, inspired, onToggleInspired }) {
  return (
    <article
      className={`rounded-lg border bg-white p-4 shadow-sm ${
        inspired ? "border-orangevoice/40" : "border-stone-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">{answer.author}</p>
          <p className="mt-1 text-xs text-stone-500">{answer.time}</p>
        </div>
        <button
          type="button"
          onClick={() => onToggleInspired(answer.id)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            inspired ? "bg-orangevoice text-white" : "bg-stone-100 text-stone-600"
          }`}
          aria-pressed={inspired}
        >
          对我有启发
        </button>
      </div>
      <p className="mt-4 text-sm leading-7 text-stone-700">{answer.text}</p>
      {inspired ? (
        <p className="mt-3 rounded-lg bg-orangevoice/10 px-3 py-2 text-xs font-semibold text-clay">
          仅你可见：这条声音被你标记了
        </p>
      ) : null}
    </article>
  );
}

function FeedScreen({ onOpenDetail, onOpenCreate }) {
  return (
    <>
      <AppTopBar
        title="求助"
        subtitle="这里不按赞数排序"
        rightAction={
          <button
            type="button"
            className="rounded-full bg-white p-3 text-stone-700 shadow-sm"
            aria-label="通知"
          >
            <Bell size={18} aria-hidden="true" />
          </button>
        }
      />
      <main className="space-y-5 px-5 py-5">
        <section className="rounded-lg bg-ink p-5 text-white">
          <p className="text-sm font-semibold text-orangevoice">
            Voice & Difference
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight">
            不找赢家，只看见更多声音。
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            求助者带走的是一组多元视角，不是一个被热度选出的答案。
          </p>
        </section>

        <section className="flex gap-2 overflow-x-auto pb-1">
          {["全部", "职场", "选择", "情绪", "关系"].map((tag, index) => (
            <button
              key={tag}
              type="button"
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                index === 0 ? "bg-ink text-white" : "bg-white text-stone-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </section>

        <section className="space-y-3">
          {mobileFeedItems.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
            >
              <button
                type="button"
                onClick={onOpenDetail}
                className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2"
              >
                <div className="flex items-center justify-between gap-3 text-xs font-semibold text-stone-500">
                  <span>{item.privacy}</span>
                  <span>{item.time}</span>
                </div>
                <p className="mt-3 text-base font-semibold leading-7 text-ink">
                  {item.title}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="mt-4">
                  <VoiceMiniBars />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-stone-500">
                  <span>{item.replies} 个声音正在回应</span>
                  <span className="inline-flex items-center gap-1 text-clay">
                    查看 <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </section>
      </main>
      <button
        type="button"
        onClick={onOpenCreate}
        className="absolute bottom-24 right-5 grid h-14 w-14 place-items-center rounded-full bg-clay text-white shadow-panel transition hover:-translate-y-0.5"
        aria-label="发起求助"
      >
        <Plus size={24} aria-hidden="true" />
      </button>
    </>
  );
}

function DetailScreen({ onBack, onOpenAnswer, onOpenReflect }) {
  const [selectedVoiceType, setSelectedVoiceType] = useState("advice");
  const [inspiredAnswerIds, setInspiredAnswerIds] = useState(["a1"]);
  const [showGuide, setShowGuide] = useState(true);
  const selectedVoice = useMemo(
    () => voiceTypes.find((voice) => voice.id === selectedVoiceType),
    [selectedVoiceType],
  );
  const selectedColors = colorClasses[selectedVoice.colorName];
  const answers = answersByVoice[selectedVoiceType];

  const toggleInspired = (answerId) => {
    setInspiredAnswerIds((current) =>
      current.includes(answerId)
        ? current.filter((id) => id !== answerId)
        : [...current, answerId],
    );
  };

  return (
    <>
      <AppTopBar
        title="求助详情"
        subtitle="按时间看见，不按热度淘汰"
        leftAction={
          <button
            type="button"
            onClick={onBack}
            className="rounded-full bg-white p-2 text-stone-700 shadow-sm"
            aria-label="返回求助流"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        }
        rightAction={
          <button
            type="button"
            onClick={onOpenAnswer}
            className="rounded-full bg-white p-3 text-stone-700 shadow-sm"
            aria-label="写回答"
          >
            <PenLine size={18} aria-hidden="true" />
          </button>
        }
      />
      <main className="space-y-4 px-5 py-5">
        <article className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">{helpRequest.author}</p>
              <p className="mt-1 text-xs font-medium text-stone-500">
                {helpRequest.time} · 匿名声音
              </p>
            </div>
            <div className="flex gap-1.5">
              {helpRequest.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <p className="mt-4 text-lg font-semibold leading-8 text-ink">
            {helpRequest.content}
          </p>
        </article>

        {showGuide ? (
          <section className="rounded-lg bg-ink p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">这里不按赞数排序</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  每种声音都有自己的位置，切换查看共鸣、建议和反观。
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="rounded-full p-1 text-stone-300 hover:bg-white/10"
                aria-label="关闭提示"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </section>
        ) : null}

        <VoiceDistributionBar
          selectedVoiceType={selectedVoiceType}
          onSelect={setSelectedVoiceType}
        />

        <p className={`rounded-lg bg-white px-4 py-3 text-sm font-semibold shadow-sm ${selectedColors.text}`}>
          {selectedVoice.label} · {selectedVoice.tone}
        </p>

        <section className="space-y-3">
          {answers.length > 0 ? answers.map((answer) => {
            const inspired = inspiredAnswerIds.includes(answer.id);
            return (
              <AnswerCard
                key={answer.id}
                answer={answer}
                inspired={inspired}
                onToggleInspired={toggleInspired}
              />
            );
          }) : null}
          <VoicePresenceNote
            answerCount={answers.length}
            voiceLabel={selectedVoice.label}
          />
        </section>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onOpenAnswer}
            className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-semibold text-ink shadow-sm"
          >
            写回答
            <PenLine size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onOpenReflect}
            className="flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white"
          >
            写下复盘
            <Send size={16} aria-hidden="true" />
          </button>
        </div>
      </main>
    </>
  );
}

function AnswerComposeScreen({ onCancel, onPublish }) {
  const [selectedVoiceType, setSelectedVoiceType] = useState("advice");
  const [answerText, setAnswerText] = useState(answerDrafts.advice);
  const selectedVoice = useMemo(
    () => voiceTypes.find((voice) => voice.id === selectedVoiceType),
    [selectedVoiceType],
  );
  const selectVoiceType = (voiceTypeId) => {
    setSelectedVoiceType(voiceTypeId);
    setAnswerText(answerDrafts[voiceTypeId]);
  };

  return (
    <>
      <AppTopBar
        title="写回答"
        subtitle="先选择你回应的方式"
        leftAction={
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-white p-2 text-stone-700 shadow-sm"
            aria-label="返回求助详情"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        }
        rightAction={
          <button
            type="button"
            onClick={onPublish}
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            发布
          </button>
        }
      />
      <main className="space-y-4 px-5 py-5">
        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold text-stone-500">正在回应</p>
          <p className="mt-2 text-base font-semibold leading-7 text-ink">
            {helpRequest.content}
          </p>
        </section>

        <VoiceDistributionBar
          selectedVoiceType={selectedVoiceType}
          onSelect={selectVoiceType}
        />

        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <label className="text-sm font-semibold text-ink" htmlFor="answer-draft">
            以「{selectedVoice.label}」回应
          </label>
          <p className="mt-2 text-xs leading-5 text-stone-500">
            {selectedVoice.claim} · {selectedVoice.tone}
          </p>
          <textarea
            id="answer-draft"
            className="mt-4 min-h-40 w-full resize-none rounded-lg border border-stone-200 bg-[#fbf7ef] p-3 text-sm leading-7 text-ink outline-none focus:border-clay"
            value={answerText}
            onChange={(event) => setAnswerText(event.target.value)}
          />
          <p className="mt-3 rounded-lg bg-orangevoice/10 px-3 py-2 text-xs leading-5 text-clay">
            发布后会进入对应声音桶，按时间展示，不参与公开热度排序。
          </p>
        </section>

        <button
          type="button"
          onClick={onPublish}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white"
        >
          发布回答
          <Send size={16} aria-hidden="true" />
        </button>
      </main>
    </>
  );
}

function ReflectionEditScreen({ onBack, onPublish }) {
  const [reflectionStarter, setReflectionStarter] = useState("我打算");
  const [reflectionText, setReflectionText] = useState(
    "先在北京再撑一年，同时回老家面试两家公司。给自己一个真实的对比，而不是只靠想象做决定。",
  );

  return (
    <>
      <AppTopBar
        title="写下复盘"
        subtitle="不强求一定有答案"
        leftAction={
          <button
            type="button"
            onClick={onBack}
            className="rounded-full bg-white p-2 text-stone-700 shadow-sm"
            aria-label="返回求助详情"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        }
        rightAction={
          <button
            type="button"
            onClick={onPublish}
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            发布
          </button>
        }
      />
      <main className="space-y-4 px-5 py-5">
        <section className="rounded-lg bg-ink p-5 text-white">
          <p className="text-sm font-semibold text-orangevoice">
            {totalVoiceCount} 条回答 · 你勾选了 {reflectionInspirations.length} 条
          </p>
          <p className="mt-3 text-lg font-semibold leading-7">
            写下你的感受，让 {totalVoiceCount} 个声音被看见。
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {voiceTypes.map((voice) => {
              const colors = colorClasses[voice.colorName];
              return (
                <div key={voice.id} className="rounded-lg bg-white/10 p-3">
                  <div className={`h-1.5 rounded-full ${colors.bg}`} />
                  <p className="mt-2 text-xs font-semibold text-stone-200">
                    {voice.label} · {voiceCounts[voice.id]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-ink">你勾选的启发</h2>
            <span className="rounded-full bg-orangevoice/10 px-3 py-1 text-xs font-semibold text-clay">
              仅你可见
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {reflectionInspirations.map((item) => (
              <article key={item.id} className="rounded-lg bg-[#fbf7ef] p-3">
                <p className="text-xs font-semibold text-clay">{item.voice}</p>
                <p className="mt-2 text-xs leading-6 text-stone-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-ink">选择一个开头</h2>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {reflectionStarters.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => setReflectionStarter(starter)}
                className={`rounded-full px-3 py-2 text-sm font-semibold ${
                  reflectionStarter === starter
                    ? "bg-ink text-white"
                    : "bg-stone-100 text-stone-600"
                }`}
                aria-pressed={reflectionStarter === starter}
              >
                {starter}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-sm font-semibold text-ink" htmlFor="reflection">
            我的阶段性回应
          </label>
          <div className="mt-3 rounded-lg border border-stone-200 bg-[#fbf7ef] p-3 focus-within:border-clay">
            <span className="text-sm font-semibold text-clay">{reflectionStarter}</span>
            <textarea
              id="reflection"
              className="mt-2 min-h-32 w-full resize-none bg-transparent text-sm leading-7 text-ink outline-none"
              value={reflectionText}
              onChange={(event) => setReflectionText(event.target.value)}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-stone-500">
            复盘不是最佳答案总结，而是把你的变化反馈给所有声音。
          </p>
        </section>

        <button
          type="button"
          onClick={onPublish}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white"
        >
          发布复盘
          <Send size={16} aria-hidden="true" />
        </button>
      </main>
    </>
  );
}

function CreateScreen({ onCancel, onPublish }) {
  const [visibility, setVisibility] = useState("仅标签广场");
  const [identity, setIdentity] = useState("匿名声音");
  const [selectedTags, setSelectedTags] = useState(["职场", "选择"]);

  const toggleTag = (tag) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : current.length < 3
          ? [...current, tag]
          : current,
    );
  };

  return (
    <>
      <AppTopBar
        title="发起求助"
        subtitle="差异本身就有价值"
        leftAction={
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-white p-2 text-stone-700 shadow-sm"
            aria-label="取消发起求助"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        }
        rightAction={
          <button
            type="button"
            onClick={onPublish}
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            发布
          </button>
        }
      />
      <main className="space-y-4 px-5 py-5">
        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <label className="text-sm font-semibold text-ink" htmlFor="question">
            你想问什么？
          </label>
          <textarea
            id="question"
            className="mt-3 min-h-32 w-full resize-none rounded-lg border border-stone-200 bg-[#fbf7ef] p-3 text-base leading-7 text-ink outline-none focus:border-clay"
            defaultValue={helpRequest.content}
          />
          <p className="mt-2 text-right text-xs text-stone-400">
            {helpRequest.content.length} / 500
          </p>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">选择标签</h2>
            <p className="text-xs font-semibold text-clay">{selectedTags.length}/3</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {composerTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  selectedTags.includes(tag)
                    ? "bg-ink text-white"
                    : "bg-stone-100 text-stone-600"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-ink">谁能看到</h2>
          <div className="mt-3 grid gap-2">
            {visibilityOptions.map((option) => (
              <button
                key={option.title}
                type="button"
                onClick={() => setVisibility(option.title)}
                className={`rounded-lg border p-3 text-left ${
                  visibility === option.title
                    ? "border-clay bg-clay/10"
                    : "border-stone-200 bg-stone-50"
                }`}
              >
                <p className="text-sm font-semibold text-ink">{option.title}</p>
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-ink">以什么身份</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["匿名声音", "实名声音"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setIdentity(option)}
                className={`rounded-lg border p-3 text-left ${
                  identity === option
                    ? "border-clay bg-clay/10"
                    : "border-stone-200 bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {option === "匿名声音" ? (
                    <Lock size={16} className="text-clay" aria-hidden="true" />
                  ) : (
                    <UserRound size={16} className="text-stone-500" aria-hidden="true" />
                  )}
                  <p className="text-sm font-semibold text-ink">{option}</p>
                </div>
                {option === "匿名声音" ? (
                  <p className="mt-2 text-xs text-clay">默认</p>
                ) : null}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-stone-500">
            匿名是默认。让不敢说的声音也能被听见。
          </p>
        </section>
      </main>
    </>
  );
}

function ReflectionDoneScreen({ onBackToFeed }) {
  return (
    <>
      <AppTopBar
        title="复盘已发出"
        subtitle={`${totalVoiceCount} 个声音正在被通知`}
        leftAction={
          <button
            type="button"
            onClick={onBackToFeed}
            className="rounded-full bg-white p-2 text-stone-700 shadow-sm"
            aria-label="返回求助流"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
        }
      />
      <main className="space-y-5 px-5 py-8 text-center">
        <section className="rounded-lg bg-ink p-8 text-white">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-orangevoice">
            <CheckCircle2 size={34} aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold">你的回应已发出</h2>
          <p className="mt-3 text-sm leading-6 text-stone-300">
            所有回答者都会看到这次复盘，被勾选者会收到「你的声音被看见了」。
          </p>
        </section>

        <section className="grid grid-cols-3 gap-2">
          {voiceTypes.map((voice) => {
            const colors = colorClasses[voice.colorName];
            return (
              <article key={voice.id} className={`rounded-lg ${colors.soft} p-3`}>
                <div
                  className={`mx-auto h-2 w-10 animate-pulse rounded-full ${colors.bg}`}
                />
                <p className={`mt-3 text-sm font-semibold ${colors.text}`}>
                  {voice.label}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {voiceCounts[voice.id]} 人
                </p>
              </article>
            );
          })}
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5 text-left shadow-sm">
          <p className="text-sm font-semibold text-stone-500">我的复盘</p>
          <div className="mt-3 flex gap-2">
            {reflectionStarters.map((starter) => (
              <span
                key={starter}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  starter === "我打算" ? "bg-ink text-white" : "bg-stone-100 text-stone-500"
                }`}
              >
                {starter}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-stone-700">
            我打算先在北京再撑一年，同时回老家面试两家公司。给自己一个真实的对比，而不是只靠想象做决定。
          </p>
        </section>

        <button
          type="button"
          onClick={onBackToFeed}
          className="w-full rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white"
        >
          回到求助流
        </button>
      </main>
    </>
  );
}

function MessagesScreen() {
  return (
    <>
      <AppTopBar
        title="消息"
        subtitle="这里没有热度榜，只有真实回声"
        rightAction={
          <button
            type="button"
            className="rounded-full bg-white p-3 text-stone-700 shadow-sm"
            aria-label="消息设置"
          >
            <Shield size={18} aria-hidden="true" />
          </button>
        }
      />
      <main className="space-y-4 px-5 py-5">
        <section className="rounded-lg bg-ink p-5 text-white">
          <p className="text-sm font-semibold text-orangevoice">
            Voice & Difference
          </p>
          <p className="mt-3 text-lg font-semibold leading-7">
            反馈不告诉你谁赢了，只告诉你声音抵达了哪里。
          </p>
        </section>

        <section className="space-y-3">
          {mobileMessages.map((message) => {
            const Icon = messageIconComponents[message.iconName];
            return (
              <article
                key={message.id}
                className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orangevoice/10 text-clay">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-sm font-semibold text-ink">
                        {message.title}
                      </h2>
                      <span className="shrink-0 text-xs font-medium text-stone-400">
                        {message.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {message.body}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}

function PlaceholderScreen({ title, description }) {
  return (
    <>
      <AppTopBar title={title} subtitle={description} />
      <main className="px-5 py-8">
        <section className="rounded-lg border border-stone-200 bg-white p-6 text-center shadow-sm">
          <Compass className="mx-auto h-8 w-8 text-clay" aria-hidden="true" />
          <h2 className="mt-5 text-xl font-semibold text-ink">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">{description}</p>
        </section>
      </main>
    </>
  );
}

export function MobileAppPrototype({ onBackToShowcase }) {
  const [activeScreen, setActiveScreen] = useState("feed");

  const goToFeed = () => setActiveScreen("feed");

  return (
    <div className="relative h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(219,124,42,0.14),transparent_34%),#efe8dd] px-0 py-0 font-sans text-ink sm:grid sm:place-items-center sm:px-6">
      <div className="absolute left-1/2 top-5 z-10 hidden w-[387px] -translate-x-1/2 items-center justify-between gap-3 sm:flex">
        <button
          type="button"
          onClick={onBackToShowcase}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          返回展示页
        </button>
        <span className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
          移动端 App 版
        </span>
      </div>
      <AppChrome activeScreen={activeScreen} onTabChange={setActiveScreen}>
        {activeScreen === "feed" ? (
          <FeedScreen
            onOpenDetail={() => setActiveScreen("detail")}
            onOpenCreate={() => setActiveScreen("create")}
          />
        ) : null}
        {activeScreen === "detail" ? (
          <DetailScreen
            onBack={goToFeed}
            onOpenAnswer={() => setActiveScreen("answer")}
            onOpenReflect={() => setActiveScreen("reflect")}
          />
        ) : null}
        {activeScreen === "answer" ? (
          <AnswerComposeScreen
            onCancel={() => setActiveScreen("detail")}
            onPublish={() => setActiveScreen("detail")}
          />
        ) : null}
        {activeScreen === "create" ? (
          <CreateScreen onCancel={goToFeed} onPublish={() => setActiveScreen("detail")} />
        ) : null}
        {activeScreen === "reflect" ? (
          <ReflectionEditScreen
            onBack={() => setActiveScreen("detail")}
            onPublish={() => setActiveScreen("done")}
          />
        ) : null}
        {activeScreen === "done" ? <ReflectionDoneScreen onBackToFeed={goToFeed} /> : null}
        {activeScreen === "messages" ? <MessagesScreen /> : null}
        {activeScreen === "profile" ? (
          <PlaceholderScreen title="我的" description="匿名声音和实名声音都由你掌控。" />
        ) : null}
      </AppChrome>
    </div>
  );
}
