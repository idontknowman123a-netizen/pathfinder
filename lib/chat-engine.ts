// Local, mock "Pathfinder AI" career-advisor engine.
// No external AI API is used. Answers are generated from the Career Knowledge
// Base (the CareerDetail data) via keyword / intent matching so the assistant
// feels like a real career counselor while running entirely on-device.

export type SalaryLevel = { label: string; range: string }
export type RoadmapStep = { stage: string; title: string; desc: string }

// Full career + personal context handed to the engine for one selected career.
export type ChatContext = {
  careerName?: string
  careerField?: string
  careerOverview?: string
  careerTasks?: string[]
  careerSkills?: string[]
  careerTools?: string[]
  careerMajors?: string[]
  careerSubjects?: string[]
  careerWorkEnvironment?: string
  careerPros?: string[]
  careerChallenges?: string[]
  careerFutures?: string[]
  careerRoadmap?: RoadmapStep[]
  salary?: SalaryLevel[]
  marketDemand?: string
  overseas?: string
  similarCareers?: string[]
  matchScore?: number
  // Personal profile (for personalization)
  mbti?: string
  mbtiTitle?: string
  strengths?: string[]
  workStyle?: string
  interests?: string[]
  environments?: string[]
  priorities?: string[]
  social?: number
  structure?: number
  income?: number
}

export type Intent =
  | 'greeting'
  | 'salary'
  | 'market'
  | 'education'
  | 'skills'
  | 'suitability'
  | 'roadmap'
  | 'future'
  | 'overseas'
  | 'jobdesc'
  | 'workplace'
  | 'challenges'
  | 'comparison'
  | 'thanks'
  | 'general'

const DEMO_NOTE = 'Dữ liệu tham khảo mô phỏng cho bản demo, không phải số liệu thị trường chính thức.'

// Strip Vietnamese diacritics so matching works with or without dấu.
function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim()
}

// Keyword sets per intent. Longer phrases carry more weight so a specific
// phrase ("nuoc ngoai") beats an incidental single-word match.
const intentKeywords: { intent: Intent; keywords: string[] }[] = [
  { intent: 'thanks', keywords: ['cam on', 'thank', 'cang on', 'tks', 'thanks'] },
  { intent: 'greeting', keywords: ['xin chao', 'chao ban', 'chao', 'hello', 'hi ', 'alo'] },
  {
    intent: 'salary',
    keywords: ['muc luong', 'thu nhap', 'bao nhieu tien', 'luong', 'salary', 'kiem duoc', 'kiem bao nhieu', 'tien luong', 'thu nhap bao nhieu'],
  },
  {
    intent: 'market',
    keywords: ['nhu cau thi truong', 'thi truong', 'nhu cau', 'tuyen dung', 'de xin viec', 'co hoi viec lam', 'hot khong', 'trien vong nghe', 'nganh nay co hot'],
  },
  {
    intent: 'education',
    keywords: ['hoc nganh gi', 'nen hoc nganh', 'nganh gi', 'nganh nao', 'chuyen nganh', 'hoc gi', 'hoc truong', 'truong nao', 'khoi thi', 'mon nao', 'mon hoc', 'thi khoi', 'dai hoc'],
  },
  {
    intent: 'skills',
    keywords: ['ky nang', 'skill', 'can gi de lam', 'gioi gi', 'to chat', 'cong cu', 'phan mem', 'tool', 'nang luc can', 'can biet gi'],
  },
  {
    intent: 'suitability',
    keywords: ['phu hop', 'hop voi toi', 'co nen theo', 'thich hop', 'toi co hop', 'toi co phu hop', 'co nen lam', 'mbti', 'tinh cach', 'hop voi minh', 'co hop khong'],
  },
  {
    intent: 'roadmap',
    keywords: ['lo trinh', 'roadmap', 'bat dau tu dau', 'cac buoc', 'con duong', 'chuan bi gi', 'lam sao de tro thanh', 'lam the nao de', 'dinh huong', 'tu dau', 'buoc dau'],
  },
  {
    intent: 'future',
    keywords: ['co hoi phat trien', 'thang tien', 'tuong lai nghe', 'trien vong', 'xu huong', 'phat trien nghe nghiep', 'huong phat trien'],
  },
  {
    intent: 'overseas',
    keywords: ['nuoc ngoai', 'quoc te', 'lam o nuoc', 'dinh cu', 'remote', 'overseas', 'abroad', 'du hoc', 'lam viec o nuoc ngoai', 'ra nuoc ngoai'],
  },
  {
    intent: 'jobdesc',
    keywords: ['cong viec la gi', 'lam nhung gi', 'lam gi', 'mo ta cong viec', 'hang ngay', 'thuong ngay', 'nhiem vu', 'cong viec cu the', 'job description', 'lam viec gi'],
  },
  {
    intent: 'workplace',
    keywords: ['moi truong lam viec', 'lam viec o dau', 'van phong', 'noi lam viec', 'workplace', 'moi truong'],
  },
  {
    intent: 'challenges',
    keywords: ['kho khan', 'thach thuc', 'ap luc', 'nhuoc diem', 'vat va', 'met moi', 'han che', 'diem tru', 'kho nhat', 'cang thang'],
  },
  {
    intent: 'comparison',
    keywords: ['so sanh', 'nghe tuong tu', 'nghe khac', 'khac gi', 'so voi', 'giong nghe', 'tuong tu', 'nghe nao giong', 'khac nhau'],
  },
]

export function detectIntent(question: string): Intent {
  const q = normalize(question)
  let best: Intent = 'general'
  let bestScore = 0
  for (const { intent, keywords } of intentKeywords) {
    let score = 0
    for (const kw of keywords) {
      if (q.includes(kw)) score += kw.length
    }
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }
  return bestScore > 0 ? best : 'general'
}

function bullets(items?: string[], limit = 6): string {
  if (!items || items.length === 0) return ''
  return items
    .slice(0, limit)
    .map((x) => `• ${x}`)
    .join('\n')
}

function marketLevel(text?: string): string {
  const t = normalize(text || '')
  if (t.startsWith('rat cao')) return 'Rất cao'
  if (t.includes('tang manh')) return 'Cao'
  if (t.startsWith('cao')) return 'Cao'
  if (t.includes('on dinh va cao')) return 'Khá cao'
  if (t.includes('tang dan')) return 'Khá cao'
  if (t.includes('on dinh')) return 'Trung bình – khá'
  return 'Khá cao'
}

function careerLabel(ctx: ChatContext): string {
  return ctx.careerName || 'nghề này'
}

function fallbackLine(topic: string): string {
  return `Mình chưa có đủ dữ liệu chi tiết về ${topic} của nghề này trong bản demo. Bạn thử hỏi mình về mức lương, kỹ năng, ngành học hoặc lộ trình nhé.`
}

// ---- Reply builders (one per intent) ---------------------------------------

function salaryReply(ctx: ChatContext): string {
  if (!ctx.salary?.length) return fallbackLine('mức lương')
  const rows = ctx.salary.map((s) => `• ${s.label}: ${s.range}`).join('\n')
  const incomeNote =
    typeof ctx.income === 'number' && ctx.income >= 4
      ? '\n\nVì bạn khá coi trọng thu nhập, hãy ưu tiên trau dồi chuyên môn sâu và tiếng Anh — đó là hai yếu tố giúp mức lương của nhóm nghề này tăng nhanh nhất.'
      : ''
  return `Đây là mức lương tham khảo của ${careerLabel(ctx)} tại Việt Nam theo từng cấp độ kinh nghiệm:\n\n${rows}\n\nMức thực tế thay đổi theo năng lực, quy mô công ty, thành phố và khả năng ngoại ngữ.${incomeNote}\n\n(${DEMO_NOTE})`
}

function marketReply(ctx: ChatContext): string {
  if (!ctx.marketDemand) return fallbackLine('nhu cầu thị trường')
  const level = marketLevel(ctx.marketDemand)
  const similar =
    ctx.similarCareers?.length
      ? `\n\nMột số nghề liên quan trong cùng lĩnh vực cũng đang tuyển nhiều: ${ctx.similarCareers.slice(0, 3).join(', ')}.`
      : ''
  return `Nhu cầu thị trường cho ${careerLabel(ctx)} hiện ở mức: ${level}.\n\n${ctx.marketDemand}${similar}\n\n(${DEMO_NOTE})`
}

function educationReply(ctx: ChatContext): string {
  const majors = bullets(ctx.careerMajors, 6)
  const subjects = ctx.careerSubjects?.length ? ctx.careerSubjects.join(', ') : ''
  if (!majors && !subjects) return fallbackLine('ngành học')
  let out = `Để theo đuổi ${careerLabel(ctx)}, bạn có thể cân nhắc các chuyên ngành đại học sau:\n\n${majors}`
  if (subjects) out += `\n\nỞ bậc THPT, bạn nên đầu tư cho các môn: ${subjects}.`
  out += '\n\nBạn không nhất thiết phải học đúng một ngành duy nhất — nhiều người vào nghề từ các ngành gần rồi bổ sung kỹ năng sau.'
  return out
}

function skillsReply(ctx: ChatContext): string {
  const skills = bullets(ctx.careerSkills, 6)
  const tools = ctx.careerTools?.length ? ctx.careerTools.join(', ') : ''
  if (!skills && !tools) return fallbackLine('kỹ năng')
  let out = `Những kỹ năng cốt lõi cho ${careerLabel(ctx)}:\n\n${skills}`
  if (tools) out += `\n\nCông cụ / phần mềm thường dùng: ${tools}.`
  if (ctx.strengths?.length) {
    out += `\n\nTin vui là điểm mạnh của bạn (${ctx.strengths.slice(0, 3).join(', ')}) có thể là bệ phóng tốt khi rèn những kỹ năng này.`
  }
  return out
}

function suitabilityReply(ctx: ChatContext): string {
  const name = careerLabel(ctx)
  const parts: string[] = []
  parts.push(`Dựa trên hồ sơ của bạn, đây là góc nhìn về mức độ phù hợp với ${name}:`)
  if (typeof ctx.matchScore === 'number') {
    parts.push(`• Mức phù hợp tổng thể: khoảng ${ctx.matchScore}%`)
  }
  if (ctx.mbti) {
    parts.push(`• Nhóm tính cách ${ctx.mbti}${ctx.mbtiTitle ? ` (${ctx.mbtiTitle})` : ''}: ${ctx.workStyle || 'bạn có phong cách làm việc riêng có thể tận dụng trong nghề này.'}`)
  }
  if (ctx.strengths?.length) {
    parts.push(`• Điểm mạnh của bạn như ${ctx.strengths.slice(0, 3).join(', ')} hỗ trợ tốt cho công việc này.`)
  }
  const sharedInterest = ctx.interests?.[0]
  if (sharedInterest) {
    parts.push(`• Bạn quan tâm đến ${sharedInterest.toLowerCase()}, đây là điểm cộng để gắn bó lâu dài.`)
  }
  if (ctx.priorities?.length) {
    if (ctx.priorities.includes('Cơ hội quốc tế')) parts.push('• Bạn coi trọng cơ hội quốc tế — nghề này có thể mở đường ra nước ngoài nếu bạn giỏi tiếng Anh.')
    if (ctx.priorities.includes('Thu nhập')) parts.push('• Bạn ưu tiên thu nhập — hãy nhắm tới nhóm chuyên môn sâu để tối ưu mức lương.')
    if (ctx.priorities.includes('Sự sáng tạo')) parts.push('• Bạn thích sáng tạo — hãy tìm những mảng cho phép bạn thử nghiệm ý tưởng mới.')
  }
  parts.push('\nHãy nhớ: MBTI và các gợi ý chỉ là công cụ tham khảo. Yếu tố quyết định là sự yêu thích và nỗ lực rèn luyện của chính bạn.')
  return parts.join('\n')
}

function roadmapReply(ctx: ChatContext): string {
  if (!ctx.careerRoadmap?.length) return fallbackLine('lộ trình')
  const steps = ctx.careerRoadmap
    .map((s, i) => `${i + 1}. ${s.stage} — ${s.title}: ${s.desc}`)
    .join('\n')
  const structureNote =
    typeof ctx.structure === 'number' && ctx.structure >= 4
      ? '\n\nBạn thích sự rõ ràng và kế hoạch, nên hãy đặt mốc cụ thể cho từng giai đoạn để dễ theo dõi tiến độ.'
      : ''
  return `Lộ trình phát triển gợi ý cho ${careerLabel(ctx)}:\n\n${steps}${structureNote}`
}

function futureReply(ctx: ChatContext): string {
  const futures = bullets(ctx.careerFutures, 5)
  if (!futures) return fallbackLine('cơ hội phát triển')
  return `Hướng phát triển và cơ hội tương lai của ${careerLabel(ctx)}:\n\n${futures}\n\nĐây là nghề có nhiều nhánh để đi lên, bạn hoàn toàn có thể chọn hướng chuyên gia hoặc quản lý tùy thế mạnh.`
}

function overseasReply(ctx: ChatContext): string {
  if (!ctx.overseas) return fallbackLine('cơ hội làm việc ở nước ngoài')
  return `Về cơ hội làm việc ở nước ngoài với ${careerLabel(ctx)}:\n\n${ctx.overseas}`
}

function jobdescReply(ctx: ChatContext): string {
  const tasks = bullets(ctx.careerTasks, 6)
  const overview = ctx.careerOverview ? `${ctx.careerOverview}\n\n` : ''
  if (!tasks && !overview) return fallbackLine('mô tả công việc')
  return `${overview}Công việc thường ngày của ${careerLabel(ctx)} gồm:\n\n${tasks || 'Đa dạng theo dự án và vị trí cụ thể.'}`
}

function workplaceReply(ctx: ChatContext): string {
  if (!ctx.careerWorkEnvironment) return fallbackLine('môi trường làm việc')
  const prefNote = ctx.environments?.length
    ? `\n\nBạn từng cho biết mình thích môi trường: ${ctx.environments.join(', ')} — hãy đối chiếu xem có khớp với nghề này không nhé.`
    : ''
  return `Môi trường làm việc của ${careerLabel(ctx)}:\n\n${ctx.careerWorkEnvironment}${prefNote}`
}

function challengesReply(ctx: ChatContext): string {
  const challenges = bullets(ctx.careerChallenges, 5)
  if (!challenges) return fallbackLine('khó khăn')
  const pros = ctx.careerPros?.length
    ? `\n\nĐổi lại, nghề cũng có những điểm hấp dẫn: ${ctx.careerPros.slice(0, 2).join('; ')}.`
    : ''
  return `Một vài khó khăn, thách thức của ${careerLabel(ctx)} bạn nên biết trước:\n\n${challenges}${pros}\n\nHiểu rõ khó khăn từ sớm sẽ giúp bạn chuẩn bị tâm thế và không bị vỡ mộng khi vào nghề.`
}

function comparisonReply(ctx: ChatContext): string {
  if (!ctx.similarCareers?.length) return fallbackLine('nghề tương tự')
  const list = ctx.similarCareers.map((c) => `• ${c}`).join('\n')
  return `Một số nghề tương tự hoặc cùng lĩnh vực với ${careerLabel(ctx)} mà bạn có thể tham khảo thêm:\n\n${list}\n\nBạn có thể mở từng nghề trong danh sách gợi ý để so sánh mức lương, kỹ năng và lộ trình rồi chọn hướng hợp nhất với mình.`
}

function greetingReply(ctx: ChatContext): string {
  return `Xin chào! Mình là Pathfinder AI, sẵn sàng tư vấn cho bạn về ${careerLabel(ctx)}. Bạn muốn tìm hiểu điều gì — mức lương, kỹ năng, ngành học, lộ trình, hay nghề này có hợp với bạn không?`
}

function thanksReply(): string {
  return 'Rất vui được đồng hành cùng bạn! Nếu còn băn khoăn gì về nghề nghiệp, cứ hỏi mình bất cứ lúc nào nhé. Chúc bạn sớm tìm được hướng đi phù hợp.'
}

function generalReply(ctx: ChatContext): string {
  const overview = ctx.careerOverview ? `${ctx.careerOverview}\n\n` : ''
  return `${overview}Mình có thể giúp bạn tìm hiểu sâu hơn về ${careerLabel(ctx)}. Bạn thử hỏi mình một trong các chủ đề sau nhé:\n\n• Mức lương theo từng cấp độ\n• Nhu cầu thị trường & tuyển dụng\n• Ngành học và môn nên đầu tư\n• Kỹ năng và công cụ cần có\n• Nghề này có hợp với bạn không\n• Lộ trình phát triển từng bước\n• Cơ hội làm việc ở nước ngoài\n• Khó khăn của nghề`
}

export function generateReply(question: string, ctx: ChatContext): string {
  const intent = detectIntent(question)
  switch (intent) {
    case 'salary':
      return salaryReply(ctx)
    case 'market':
      return marketReply(ctx)
    case 'education':
      return educationReply(ctx)
    case 'skills':
      return skillsReply(ctx)
    case 'suitability':
      return suitabilityReply(ctx)
    case 'roadmap':
      return roadmapReply(ctx)
    case 'future':
      return futureReply(ctx)
    case 'overseas':
      return overseasReply(ctx)
    case 'jobdesc':
      return jobdescReply(ctx)
    case 'workplace':
      return workplaceReply(ctx)
    case 'challenges':
      return challengesReply(ctx)
    case 'comparison':
      return comparisonReply(ctx)
    case 'greeting':
      return greetingReply(ctx)
    case 'thanks':
      return thanksReply()
    default:
      return generalReply(ctx)
  }
}
