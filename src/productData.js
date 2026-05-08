export const productPrinciples = [
  "反赢家通吃",
  "差异即价值",
  "温度优先于效率",
  "小众也被看见",
];

export const platformGaps = [
  {
    name: "微博 / 朋友圈",
    problem: "熟人压力强，不一定敢真实表达。",
  },
  {
    name: "知乎",
    problem: "高赞答案容易成为唯一显眼答案。",
  },
  {
    name: "树洞类产品",
    problem: "关系链弱，反馈容易显得冷漠。",
  },
];

export const coreScenarios = [
  {
    title: "选择困难型",
    question: "工作两年了，要不要回老家？",
    need: "多立场对照，帮助自己判断。",
  },
  {
    title: "情绪共鸣型",
    question: "和领导吵架后睡不着。",
    need: "陪伴、理解、被接住。",
  },
  {
    title: "经验取经型",
    question: "第一次产检需要准备什么？",
    need: "来自不同人的实际经验。",
  },
];

export const voiceTypes = [
  {
    id: "empathy",
    label: "共鸣",
    claim: "我陪你站着",
    colorName: "rosevoice",
    tone: "感性陪伴、相似经历、祝福、理解",
    answer:
      "我也在迷茫这个问题，看到你写出来的瞬间松了一口气。原来不是只有我在害怕选错。",
  },
  {
    id: "advice",
    label: "建议",
    claim: "我给你方法",
    colorName: "orangevoice",
    tone: "理性分析、实际建议、过来人经验",
    answer:
      "理性看，30 岁前在北京积累更重要。但如果北京已经掏空你，回去也是合理选择。你可以先列出留下和离开的代价，再做判断。",
  },
  {
    id: "mirror",
    label: "反观",
    claim: "我给你另一面",
    colorName: "violetvoice",
    tone: "反向提醒、旁观视角、风险提示",
    answer:
      "你问的是「该不该回」，但你真正怕的可能是「如果回了发现不对怎么办」。也许你要先解决的是对试错的恐惧。",
  },
];

export const visibilityOptions = [
  {
    title: "仅好友圈",
    description: "互相关注的人可见，更有关系温度。",
  },
  {
    title: "仅标签广场",
    description: "基于标签匹配的陌生人可见，更容易获得多元声音。",
  },
  {
    title: "两者都发",
    description: "同时获得熟人温度和陌生人视角。",
  },
];

export const metrics = [
  {
    label: "桶分布均衡度",
    value: "不让单类声音吞掉全场",
  },
  {
    label: "少数声音保留率",
    value: "少量回答仍有独立位置",
  },
  {
    label: "复盘率",
    value: "衡量求助是否形成闭环",
  },
  {
    label: "被勾选回答分布",
    value: "启发不应只来自建议",
  },
  {
    label: "匿名使用率",
    value: "观察表达门槛是否足够低",
  },
];

export const reflectionStarters = ["我认为", "我打算", "我学到"];

export const colorClasses = {
  rosevoice: {
    text: "text-rosevoice",
    bg: "bg-rosevoice",
    soft: "bg-rosevoice/10",
    border: "border-rosevoice/25",
  },
  orangevoice: {
    text: "text-orangevoice",
    bg: "bg-orangevoice",
    soft: "bg-orangevoice/10",
    border: "border-orangevoice/25",
  },
  violetvoice: {
    text: "text-violetvoice",
    bg: "bg-violetvoice",
    soft: "bg-violetvoice/10",
    border: "border-violetvoice/25",
  },
};

export const helpRequest = {
  author: "@匿名声音",
  time: "2 小时前",
  tags: ["职场", "选择"],
  content:
    "工作两年了，要不要回老家？北京压力大，但回去又怕没机会，最近每天都失眠。",
};

