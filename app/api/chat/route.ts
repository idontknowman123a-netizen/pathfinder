import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  type UIMessage,
} from 'ai'

export const maxDuration = 30

export type ChatContext = {
  careerName?: string
  careerField?: string
  careerOverview?: string
  careerSkills?: string[]
  careerMajors?: string[]
  careerSalary?: string
  careerOverseas?: string
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

function list(items?: string[]) {
  return items && items.length ? items.join(', ') : 'chưa cung cấp'
}

function buildSystem(ctx: ChatContext = {}): string {
  const scale = (n?: number) => (typeof n === 'number' ? `${n}/5` : 'chưa rõ')
  return `Bạn là "Pathfinder AI", một trợ lý định hướng nghề nghiệp thân thiện, ấm áp và đáng tin cậy, chuyên tư vấn cho học sinh và sinh viên Việt Nam. Bạn LUÔN trả lời bằng tiếng Việt tự nhiên, gần gũi, dễ hiểu và tích cực.

NGHỀ NGHIỆP NGƯỜI DÙNG ĐANG XEM:
- Tên nghề: ${ctx.careerName || 'chưa xác định'}
- Lĩnh vực: ${ctx.careerField || 'chưa xác định'}
- Mô tả: ${ctx.careerOverview || 'chưa có'}
- Kỹ năng cốt lõi: ${list(ctx.careerSkills)}
- Chuyên ngành đại học liên quan: ${list(ctx.careerMajors)}
- Khoảng lương tham khảo tại Việt Nam: ${ctx.careerSalary || 'chưa có'}
- Cơ hội quốc tế: ${ctx.careerOverseas || 'chưa có'}

HỒ SƠ CÁ NHÂN CỦA NGƯỜI DÙNG (dùng để cá nhân hóa mọi câu trả lời):
- Nhóm tính cách MBTI: ${ctx.mbti || 'chưa rõ'} (${ctx.mbtiTitle || ''})
- Điểm mạnh: ${list(ctx.strengths)}
- Phong cách làm việc: ${ctx.workStyle || 'chưa rõ'}
- Sở thích: ${list(ctx.interests)}
- Môi trường làm việc mong muốn: ${list(ctx.environments)}
- Ưu tiên nghề nghiệp: ${list(ctx.priorities)}
- Mức độ thích giao tiếp: ${scale(ctx.social)}
- Mức độ thích cấu trúc/kế hoạch: ${scale(ctx.structure)}
- Mức độ coi trọng thu nhập: ${scale(ctx.income)}

NGUYÊN TẮC TRẢ LỜI:
1. Luôn cá nhân hóa: khi người dùng hỏi "nghề này có phù hợp với tôi không?", hãy phân tích dựa trên MBTI, điểm mạnh, sở thích, môi trường và ưu tiên THỰC TẾ ở trên, chỉ ra điểm hợp và điểm cần lưu ý, thay vì trả lời chung chung.
2. Nội dung bám sát nghề người dùng đang xem: bản chất nghề, công việc hằng ngày, kỹ năng, yêu cầu học tập, môi trường làm việc, cơ hội thăng tiến, mức lương, nhu cầu thị trường, lộ trình phát triển và cơ hội quốc tế.
3. Dùng số liệu và mức lương theo bối cảnh Việt Nam; nếu ước lượng thì nói rõ là con số tham khảo.
4. Trả lời ngắn gọn, có cấu trúc, ưu tiên gạch đầu dòng khi liệt kê. Độ dài vừa phải (khoảng 4-10 câu), tránh lan man.
5. Giọng điệu như một người anh/chị đi trước: chân thành, khích lệ, thực tế. Có thể dùng tối đa 1-2 emoji khi phù hợp.
6. Khuyến khích người dùng khám phá và tự quyết định; nhấn mạnh MBTI là công cụ tham khảo, không phải giới hạn.
7. Nếu người dùng hỏi ngoài phạm vi định hướng nghề nghiệp, hãy nhẹ nhàng dẫn dắt về chủ đề nghề nghiệp và học tập.`
}

function errorMessage(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error ?? '')
  if (/credit card|customer_verification_required|free credits/i.test(raw)) {
    return 'Pathfinder AI hiện chưa thể trả lời vì AI Gateway của dự án chưa được kích hoạt (cần thêm thẻ thanh toán để mở khóa tín dụng miễn phí trên Vercel). Vui lòng thử lại sau khi đã kích hoạt.'
  }
  if (/rate.?limit|429/i.test(raw)) {
    return 'Pathfinder AI đang nhận quá nhiều yêu cầu cùng lúc. Bạn vui lòng thử lại sau giây lát nhé.'
  }
  return 'Xin lỗi, Pathfinder AI gặp sự cố khi xử lý câu hỏi của bạn. Bạn vui lòng thử lại nhé.'
}

export async function POST(req: Request) {
  try {
    const { messages, context }: { messages: UIMessage[]; context?: ChatContext } = await req.json()

    const result = streamText({
      model: 'google/gemini-2.5-flash',
      system: buildSystem(context),
      messages: await convertToModelMessages(messages),
    })

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: errorMessage,
      }),
    })
  } catch (error) {
    console.log('[v0] /api/chat error:', error)
    return new Response(JSON.stringify({ error: errorMessage(error) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
