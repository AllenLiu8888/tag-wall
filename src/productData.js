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

export const mobileFeedItems = [
  {
    id: "career-home",
    title: helpRequest.content,
    tags: helpRequest.tags,
    replies: 23,
    time: "2h",
    privacy: "匿名 · 标签广场",
  },
  {
    id: "sleep-leader",
    title: "和领导吵架后睡不着，明天还要开会，我是不是太玻璃心了？",
    tags: ["职场", "情绪"],
    replies: 11,
    time: "45m",
    privacy: "匿名 · 好友圈",
  },
  {
    id: "checkup",
    title: "第一次产检需要准备什么？想听听不同人的实际经验。",
    tags: ["生活", "成长"],
    replies: 8,
    time: "5h",
    privacy: "实名 · 标签广场",
  },
];

export const answersByVoice = {
  empathy: [
    {
      id: "e1",
      author: "@匿名声音",
      time: "12m",
      text: voiceTypes[0].answer,
    },
    {
      id: "e2",
      author: "@也在摇摆",
      time: "38m",
      text: "这种问题最累的地方，是每个选项都有代价。先抱抱你，能写出来已经不是原地打转了。",
    },
  ],
  advice: [
    {
      id: "a1",
      author: "@小王",
      time: "1h",
      text: voiceTypes[1].answer,
    },
    {
      id: "a2",
      author: "@过来人",
      time: "3h",
      text: "可以先做两周的信息收集：北京内部转岗、老家面试、远程机会各列三项，再比较真实选项。",
    },
  ],
  mirror: [
    {
      id: "m1",
      author: "@匿名声音",
      time: "2h",
      text: voiceTypes[2].answer,
    },
  ],
};

export const voiceCounts = {
  empathy: 12,
  advice: 8,
  mirror: 3,
};

export const totalVoiceCount = Object.values(voiceCounts).reduce(
  (sum, count) => sum + count,
  0,
);

export const reflectionInspirations = [
  {
    id: "a1",
    voice: "建议",
    text: "重要的不是城市，是你想过怎样的生活。你可以给自己一段真实试错的时间。",
  },
  {
    id: "m1",
    voice: "反观",
    text: "你真正怕的可能不是回去，而是如果回去后发现不对怎么办。",
  },
  {
    id: "e2",
    voice: "共鸣",
    text: "每个选项都有代价，能写出来已经不是原地打转了。",
  },
];

export const answerDrafts = {
  empathy:
    "我也经历过这种摇摆。先把害怕说出来，会比一个人反复想轻一点。",
  advice:
    "可以先给自己一个两周计划：北京内部机会、老家岗位、远程可能各找三个真实选项，再判断。",
  mirror:
    "你问的是城市选择，但也许真正需要确认的是：你愿不愿意接受一次试错。",
};

export const mobileMessages = [
  {
    id: "seen",
    title: "你的声音被看见了",
    body: "求助者把你的回答标记为「对我有启发」。这不是点赞，也不是采纳，只是你的声音真的抵达了对方。",
    time: "刚刚",
    iconName: "seen",
  },
  {
    id: "reflection",
    title: "求助者发布了复盘",
    body: "「我打算先在北京再撑一年，同时回老家面试两家公司。」所有回答者都能看到这次回应。",
    time: "12 分钟前",
    iconName: "reflection",
  },
];

export const composerTags = ["职场", "选择", "情绪", "关系", "生活", "成长"];
