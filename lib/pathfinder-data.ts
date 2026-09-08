export type Dimension = 'EI' | 'SN' | 'TF' | 'JP'
export type Direction = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
export type Question = { id: number; question: string; dimension: Dimension; options: { text: string; direction: Direction; weight: number }[] }

type QuestionSeed = [question: string, dimension: Dimension, first: string, second: string, firstDirection: Direction, secondDirection: Direction]

const questionSeeds: QuestionSeed[] = [
  ['Trong buổi định hướng có nhiều người lạ, bạn thường chủ động làm quen trước.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Sau một ngày nhiều tương tác, tôi thấy có thêm năng lượng để gặp gỡ bạn bè.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Khi bí ý tưởng, tôi thích nói chuyện với người khác để nghĩ ra hướng mới.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Trong dự án nhóm, tôi thoải mái trình bày ý tưởng trước cả nhóm.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Tôi thường mở rộng mối quan hệ qua câu lạc bộ, sự kiện hoặc hoạt động chung.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Khi có tin vui, tôi muốn chia sẻ ngay với một người khác.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Tôi tập trung tốt hơn khi được làm việc trong không gian có người xung quanh.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Tôi dễ bắt chuyện với người mới nếu chủ đề chưa quen thuộc.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Khi tham gia hoạt động, tôi thường là người khuấy động không khí.', 'EI', 'Rất giống tôi', 'Không giống tôi', 'E', 'I'],
  ['Tôi thích suy nghĩ một mình trước khi chia sẻ quan điểm của mình.', 'EI', 'Không giống tôi', 'Rất giống tôi', 'E', 'I'],
  ['Khi học kỹ năng mới, tôi muốn thấy ví dụ cụ thể và được thực hành.', 'SN', 'Rất giống tôi', 'Không giống tôi', 'S', 'N'],
  ['Tôi thường chú ý đến chi tiết nhỏ trong một quy trình hoặc sản phẩm.', 'SN', 'Rất giống tôi', 'Không giống tôi', 'S', 'N'],
  ['Khi giải quyết lỗi, tôi kiểm tra dữ kiện và các bước đã xảy ra trước.', 'SN', 'Rất giống tôi', 'Không giống tôi', 'S', 'N'],
  ['Tôi tin vào phương pháp đã được kiểm chứng trước khi thử cách mới.', 'SN', 'Rất giống tôi', 'Không giống tôi', 'S', 'N'],
  ['Tôi nhớ tốt những gì đã nhìn thấy, nghe thấy hoặc trực tiếp trải nghiệm.', 'SN', 'Rất giống tôi', 'Không giống tôi', 'S', 'N'],
  ['Khi lập kế hoạch, tôi hình dung trước nhiều khả năng có thể xảy ra.', 'SN', 'Không giống tôi', 'Rất giống tôi', 'S', 'N'],
  ['Tôi nhanh chóng nhận ra ý nghĩa hoặc xu hướng ẩn sau nhiều thông tin.', 'SN', 'Không giống tôi', 'Rất giống tôi', 'S', 'N'],
  ['Tôi thích đặt câu hỏi “nếu như” để mở ra những hướng đi khác.', 'SN', 'Không giống tôi', 'Rất giống tôi', 'S', 'N'],
  ['Tôi quan tâm đến cách một ý tưởng có thể phát triển trong tương lai.', 'SN', 'Không giống tôi', 'Rất giống tôi', 'S', 'N'],
  ['Tôi thích làm việc với khái niệm, mô hình và các khả năng chưa thử nghiệm.', 'SN', 'Không giống tôi', 'Rất giống tôi', 'S', 'N'],
  ['Khi chọn giữa hai phương án, tôi ưu tiên bằng chứng và tính hiệu quả.', 'TF', 'Rất giống tôi', 'Không giống tôi', 'T', 'F'],
  ['Khi góp ý, tôi tập trung vào vấn đề và cách cải thiện cụ thể.', 'TF', 'Rất giống tôi', 'Không giống tôi', 'T', 'F'],
  ['Trong tranh luận, tôi có thể tách ý kiến khỏi cảm xúc cá nhân.', 'TF', 'Rất giống tôi', 'Không giống tôi', 'T', 'F'],
  ['Tôi thấy một quyết định tốt cần nhất quán dù có thể không làm mọi người vui.', 'TF', 'Rất giống tôi', 'Không giống tôi', 'T', 'F'],
  ['Tôi thích dùng tiêu chí rõ ràng để đánh giá chất lượng công việc.', 'TF', 'Rất giống tôi', 'Không giống tôi', 'T', 'F'],
  ['Khi bạn buồn, tôi ưu tiên lắng nghe và công nhận cảm xúc của bạn ấy.', 'TF', 'Không giống tôi', 'Rất giống tôi', 'T', 'F'],
  ['Tôi cân nhắc giá trị cá nhân và tác động đến người khác trước khi quyết định.', 'TF', 'Không giống tôi', 'Rất giống tôi', 'T', 'F'],
  ['Tôi thường nhận ra người khác đang không thoải mái dù họ không nói ra.', 'TF', 'Không giống tôi', 'Rất giống tôi', 'T', 'F'],
  ['Trong làm việc nhóm, sự hòa hợp quan trọng với tôi không kém kết quả.', 'TF', 'Không giống tôi', 'Rất giống tôi', 'T', 'F'],
  ['Tôi điều chỉnh cách nói để người nghe cảm thấy được tôn trọng.', 'TF', 'Không giống tôi', 'Rất giống tôi', 'T', 'F'],
  ['Với dự án dài, tôi chia nhỏ công việc và đặt mốc hoàn thành cụ thể.', 'JP', 'Rất giống tôi', 'Không giống tôi', 'J', 'P'],
  ['Tôi thích biết trước lịch trình và những việc cần chuẩn bị.', 'JP', 'Rất giống tôi', 'Không giống tôi', 'J', 'P'],
  ['Tôi thường hoàn thành việc quan trọng trước khi bắt đầu việc mới.', 'JP', 'Rất giống tôi', 'Không giống tôi', 'J', 'P'],
  ['Bàn làm việc và tài liệu của tôi có hệ thống dễ tìm.', 'JP', 'Rất giống tôi', 'Không giống tôi', 'J', 'P'],
  ['Tôi thấy yên tâm hơn khi quyết định sớm thay vì để mở quá lâu.', 'JP', 'Rất giống tôi', 'Không giống tôi', 'J', 'P'],
  ['Tôi thích giữ lịch trình mở để có thể đổi hướng theo cơ hội mới.', 'JP', 'Không giống tôi', 'Rất giống tôi', 'J', 'P'],
  ['Tôi thường bắt đầu làm rồi vừa làm vừa tìm ra cách tốt hơn.', 'JP', 'Không giống tôi', 'Rất giống tôi', 'J', 'P'],
  ['Khi kế hoạch thay đổi đột ngột, tôi dễ thích nghi và tìm phương án khác.', 'JP', 'Không giống tôi', 'Rất giống tôi', 'J', 'P'],
  ['Tôi làm việc hiệu quả khi có quyền tự chọn thời gian và phương pháp.', 'JP', 'Không giống tôi', 'Rất giống tôi', 'J', 'P'],
  ['Tôi thường để nhiều lựa chọn mở cho đến khi có đủ thông tin.', 'JP', 'Không giống tôi', 'Rất giống tôi', 'J', 'P']
]

const answerScale = [2, 1, 0, -1, -2]
export const questions: Question[] = questionSeeds.map(([question, dimension, first, second, firstDirection, secondDirection], index) => ({
  id: index + 1,
  question,
  dimension,
  options: answerScale.map((weight, optionIndex) => ({
    text: optionIndex === 0 ? `Hoàn toàn đồng ý: ${first}` : optionIndex === 1 ? `Khá đúng: ${first}` : optionIndex === 2 ? 'Phân vân hoặc tùy hoàn cảnh' : optionIndex === 3 ? `Khá đúng: ${second}` : `Hoàn toàn đồng ý: ${second}`,
    direction: weight >= 0 ? firstDirection : secondDirection,
    weight: Math.abs(weight)
  }))
})) as Question[]

export type Personality = {
  name: string
  code: string
  title: string
  description: string
  strengths: string[]
  challenges: string[]
  workStyle: string
  careerFit: string[]
}

const personalities: Record<string, Personality> = {
  ISTJ: {
    name: 'ISTJ',
    code: 'ISTJ',
    title: 'Người Kiểm Soát Viên',
    description: 'Bạn là người trách nhiệm, tổ chức và đáng tin cậy. Bạn thích công việc có cấu trúc rõ ràng, tuân thủ quy tắc và hoàn thành mục tiêu theo đúng kế hoạch.',
    strengths: ['Trách nhiệm cao', 'Tổ chức tốt', 'Đáng tin cậy', 'Quyết định dựa trên dữ liệu', 'Tập trung vào kết quả'],
    challenges: ['Có thể quá cứng nhắc', 'Khó thích nghi với thay đổi', 'Có thể thiếu tính sáng tạo'],
    workStyle: 'Bạn làm việc tốt nhất khi có kế hoạch rõ ràng, tiêu chí cụ thể và độc lập trong thực hiện. Bạn đánh giá cao độ ổn định và kết quả đo được.',
    careerFit: ['career-1', 'career-2', 'career-12', 'career-21', 'career-31']
  },
  ISFJ: {
    name: 'ISFJ',
    code: 'ISFJ',
    title: 'Người Bảo Vệ',
    description: 'Bạn là người tận tâm, chăm sóc và tổ chức. Bạn luôn đặt nhu cầu của người khác lên trên, giỏi nhận thấy những chi tiết nhỏ mà người khác bỏ qua.',
    strengths: ['Đồng cảm cao', 'Tổ chức tốt', 'Tận tâm với công việc', 'Lắng nghe tốt', 'Đáng tin cậy'],
    challenges: ['Có thể quá lo lắng', 'Khó nói không', 'Có thể bỏ qua bản thân'],
    workStyle: 'Bạn thích môi trường hỗ trợ, nơi bạn có thể giúp đỡ người khác. Bạn làm việc tốt với một đội nhóm nhỏ, ổn định và có mục tiêu rõ ràng.',
    careerFit: ['career-35', 'career-36', 'career-38', 'career-34', 'career-33']
  },
  INFJ: {
    name: 'INFJ',
    code: 'INFJ',
    title: 'Người Cố Vấn',
    description: 'Bạn là người có trực giác mạnh, tầm nhìn xa và muốn tạo ra ảnh hưởng tích cực. Bạn thấy tiềm năng trong mọi người và thích giúp họ phát triển.',
    strengths: ['Trực giác mạnh', 'Tầm nhìn xa', 'Người kết nối', 'Sắc sảo nhận xét', 'Có lý tưởng'],
    challenges: ['Có thể hoàn hảo hóa quá mức', 'Cảm thấy cô lập', 'Có thể quá chỉ trích bản thân'],
    workStyle: 'Bạn thích công việc có ý nghĩa, giúp bạn phát triển bản thân và tạo ra sự thay đổi. Bạn cần đủ không gian để suy ngẫm và phát triển ý tưởng.',
    careerFit: ['career-36', 'career-33', 'career-39', 'career-38', 'career-40']
  },
  INTJ: {
    name: 'INTJ',
    code: 'INTJ',
    title: 'Nhà Kiến Trúc',
    description: 'Bạn là người có tư duy chiến lược, tầm nhìn dài hạn và quyết tâm cao. Bạn thích phân tích, tìm hiểu sâu và xây dựng hệ thống hiệu quả.',
    strengths: ['Tư duy chiến lược', 'Tư duy phê phán', 'Độc lập cao', 'Quyết tâm', 'Tầm nhìn xa'],
    challenges: ['Có thể thiếu sự đồng cảm', 'Khó làm việc nhóm', 'Có thể quá kiên nhẫn'],
    workStyle: 'Bạn thích công việc có độ phức tạp cao, cho phép bạn sáng tạo và cải tiến. Bạn cần độc lập, công nhân, và cơ hội để lãnh đạo.',
    careerFit: ['career-0', 'career-5', 'career-16', 'career-21', 'career-25']
  },
  ISTP: {
    name: 'ISTP',
    code: 'ISTP',
    title: 'Nhà Thợ',
    description: 'Bạn là người thực tế, linh hoạt và giỏi giải quyết vấn đề. Bạn thích học hỏi qua thực hành và xử lý các tình huống thực tế.',
    strengths: ['Giải quyết vấn đề tốt', 'Linh hoạt', 'Thực tế', 'Dũng cảm thử cái mới', 'Độc lập'],
    challenges: ['Có thể thiếu tính dự phòng', 'Khó thực hiện kế hoạch dài hạn', 'Có thể rủi ro'],
    workStyle: 'Bạn thích công việc thực hành, độc lập và cho phép bạn giải quyết vấn đề cụ thể. Bạn học tốt nhất qua trải nghiệm trực tiếp.',
    careerFit: ['career-6', 'career-7', 'career-8', 'career-9', 'career-10']
  },
  ISFP: {
    name: 'ISFP',
    code: 'ISFP',
    title: 'Người Nghệ Sĩ',
    description: 'Bạn là người nhạy cảm với thẩm mỹ, tận tâm với công việc và giỏi ghi nhận chi tiết. Bạn thích các công việc sáng tạo và có ý nghĩa cá nhân.',
    strengths: ['Thẩm mỹ tốt', 'Giỏi ghi nhận chi tiết', 'Linh hoạt', 'Tận tâm', 'Tử tế và lịch sự'],
    challenges: ['Có thể thiếu tự tin', 'Khó thích nghi với xung đột', 'Có thể thiếu hoạch định'],
    workStyle: 'Bạn thích môi trường sáng tạo, cho phép bạn thực hiện công việc theo cách riêng. Bạn cần cảm thấy công việc có ý nghĩa cá nhân.',
    careerFit: ['career-27', 'career-28', 'career-29', 'career-30', 'career-31']
  },
  INFP: {
    name: 'INFP',
    code: 'INFP',
    title: 'Người Hòa Giải',
    description: 'Bạn là người có lý tưởng, sáng tạo và quan tâm sâu sắc đến giá trị của con người. Bạn muốn tìm ra mục đích đúng đắn và tạo ra ảnh hưởng tích cực.',
    strengths: ['Sáng tạo cao', 'Tâm hồn lớn', 'Chân thành', 'Tìm kiếm ý nghĩa', 'Độc lập tư duy'],
    challenges: ['Có thể quá hoàn hảo hóa', 'Dễ bị xúc phạm', 'Có thể thiếu tổ chức'],
    workStyle: 'Bạn thích công việc cho phép bạn phát triển tư duy sáng tạo và tạo ra ảnh hưởng cá nhân. Bạn cần linh hoạt và cơ hội khám phá.',
    careerFit: ['career-39', 'career-40', 'career-41', 'career-42', 'career-33']
  },
  INTP: {
    name: 'INTP',
    code: 'INTP',
    title: 'Nhà Tư Duy',
    description: 'Bạn là người thích suy tư sâu, phân tích logic và khám phá những ý tưởng trừu tượng. Bạn thích hiểu cách mọi thứ hoạt động ở mức độ cơ bản.',
    strengths: ['Tư duy logic', 'Khám phá ý tưởng', 'Tư duy độc lập', 'Giải quyết vấn đề sáng tạo', 'Tò mò cao'],
    challenges: ['Có thể thiếu tổ chức', 'Khó bắt tay thực hiện', 'Có thể quá lý thuyết'],
    workStyle: 'Bạn thích công việc liên quan đến suy tư, nghiên cứu và giải quyết vấn đề phức tạp. Bạn cần độc lập và thời gian suy ngẫm.',
    careerFit: ['career-0', 'career-1', 'career-2', 'career-3', 'career-22']
  },
  ESTP: {
    name: 'ESTP',
    code: 'ESTP',
    title: 'Người Thực Thi',
    description: 'Bạn là người dũng cảm, thích thử thách và khéo léo xử lý tình huống. Bạn thích hành động ngay, thích những công việc năng động và thực tế.',
    strengths: ['Dũng cảm', 'Linh hoạt', 'Khéo léo xử lý', 'Năng lượng cao', 'Thực tế'],
    challenges: ['Có thể thiếu kiên nhẫn', 'Khó tập trung lâu dài', 'Có thể rủi ro quá mức'],
    workStyle: 'Bạn thích công việc năng động, cho phép bạn hành động nhanh và xử lý khủng hoảng. Bạn cần sự hứng thú và thử thách.',
    careerFit: ['career-10', 'career-20', 'career-11', 'career-23', 'career-24']
  },
  ESFP: {
    name: 'ESFP',
    code: 'ESFP',
    title: 'Người Biểu Diễn',
    description: 'Bạn là người vui vẻ, năng động và giỏi kết nối con người. Bạn thích sống ở hiện tại, tạo ra niềm vui và là tâm điểm của câu chuyện.',
    strengths: ['Sôi nổi', 'Kết nối tốt', 'Năng lượng cao', 'Thực tế', 'Tạo vui vẻ'],
    challenges: ['Có thể thiếu kiên nhẫn', 'Khó tập trung công việc dài hạn', 'Có thể thiếu tổ chức'],
    workStyle: 'Bạn thích công việc cho phép bạn kết nối con người, tạo ra vui vẻ và có sự biến thiên. Bạn cần năng lượng cao từ mọi người.',
    careerFit: ['career-32', 'career-40', 'career-41', 'career-42', 'career-34']
  },
  ESTJ: {
    name: 'ESTJ',
    code: 'ESTJ',
    title: 'Nhà Quản Lý',
    description: 'Bạn là người lãnh đạo, tổ chức và có trách nhiệm cao. Bạn giỏi quản lý con người và tài nguyên để đạt được mục tiêu cụ thể.',
    strengths: ['Lãnh đạo tốt', 'Tổ chức tốt', 'Trách nhiệm cao', 'Quyết tâm', 'Hiệu quả'],
    challenges: ['Có thể quá cứng nhắc', 'Có thể thiếu sự đồng cảm', 'Khó thích nghi với thay đổi'],
    workStyle: 'Bạn thích công việc quản lý, lãnh ����ạo và có cấu trúc rõ ràng. Bạn cần đạt được mục tiêu cụ thể và công nhân cho nỗ lực.',
    careerFit: ['career-12', 'career-20', 'career-16', 'career-21', 'career-37']
  },
  ESFJ: {
    name: 'ESFJ',
    code: 'ESFJ',
    title: 'Người Tổ Chức',
    description: 'Bạn là người chăm sóc, tổ chức và yêu thích được phục vụ. Bạn giỏi kết nối con người, tạo ra hòa hợp và đảm bảo mọi người đều hạnh phúc.',
    strengths: ['Chăm sóc tốt', 'Tổ chức tốt', 'Kết nối con người', 'Lãnh đạo hỗ trợ', 'Trách nhiệm'],
    challenges: ['Có thể quá phụ thuộc công nhân', 'Khó đối mặt với xung đột', 'Có thể quá lo lắng'],
    workStyle: 'Bạn thích công việc hỗ trợ, tổ chức và liên quan đến con người. Bạn cần cảm thấy được đánh giá cao và là phần của một nhóm.',
    careerFit: ['career-34', 'career-35', 'career-37', 'career-36', 'career-42']
  },
  ENFJ: {
    name: 'ENFJ',
    code: 'ENFJ',
    title: 'Người Lãnh Đạo',
    description: 'Bạn là người lãnh đạo có tâm hồn, tầm nhìn cao và muốn giúp mọi người phát triển. Bạn giỏi truyền cảm hứng, tạo ra mục tiêu chung và kết nối mọi người.',
    strengths: ['Lãnh đạo tốt', 'Truyền cảm hứng', 'Kết nối con người', 'Tầm nhìn cao', 'Chăm sóc tốt'],
    challenges: ['Có thể quá tập trung vào người khác', 'Khó nói không', 'Có thể thiếu tự chăm sóc'],
    workStyle: 'Bạn thích công việc lãnh đạo, giúp mọi người và tạo ra thay đổi. Bạn cần cảm thấy công việc có ý nghĩa và giúp được cộng đồng.',
    careerFit: ['career-20', 'career-36', 'career-33', 'career-40', 'career-42']
  },
  ENFP: {
    name: 'ENFP',
    code: 'ENFP',
    title: 'Người Truyền Cảm Hứng',
    description: 'Bạn là người nhiệt tình, giàu trí tưởng tượng và luôn nhìn thấy tiềm năng trong con người cũng như những ý tưởng mới. Bạn thích kết nối, khám phá và tạo ra những thay đổi tích cực.',
    strengths: ['Nhiệt tình', 'Sáng tạo', 'Truyền cảm hứng', 'Kết nối tốt', 'Linh hoạt'],
    challenges: ['Có thể dễ mất tập trung', 'Khó hoàn thành việc đơn điệu', 'Có thể quá lý tưởng hóa'],
    workStyle: 'Bạn thích công việc có ý nghĩa, nhiều không gian sáng tạo và cơ hội kết nối với người khác. Bạn phát huy tốt khi được khám phá ý tưởng mới và truyền năng lượng cho đội nhóm.',
    careerFit: ['career-17', 'career-25', 'career-33', 'career-40', 'career-42']
  },
  ENTP: {
    name: 'ENTP',
    code: 'ENTP',
    title: 'Nhà Phát Minh',
    description: 'Bạn là người sáng tạo, thích tranh luận ý tưởng và khám phá những khả năng mới. Bạn giỏi tìm ra các cách tiếp cận mới và giải quyết vấn đề phức tạp.',
    strengths: ['Sáng tạo cao', 'Tranh luận logic', 'Linh hoạt', 'Khám phá ý tưởng', 'Tò mò'],
    challenges: ['Có thể thiếu tổ chức', 'Khó kết thúc dự án', 'Có thể quá lý thuyết'],
    workStyle: 'Bạn thích công việc cho phép bạn sáng tạo, thử nghiệm ý tưởng mới và tranh luận. Bạn cần tự do và cơ hội khám phá.',
    careerFit: ['career-0', 'career-1', 'career-14', 'career-17', 'career-25']
  },
  ENTJ: {
    name: 'ENTJ',
    code: 'ENTJ',
    title: 'Nhà Tư Lệnh',
    description: 'Bạn là người lãnh đạo chiến lược, quyết tâm cao và muốn đạt được mục tiêu lớn. Bạn giỏi tổ chức, lên kế hoạch chiến lược và lãnh đạo đội nhóm.',
    strengths: ['Lãnh đạo tốt', 'Chiến lược', 'Quyết tâm cao', 'Hiệu quả', 'Tầm nhìn xa'],
    challenges: ['Có thể quá cứng nhắc', 'Có thể thiếu sự đồng cảm', 'Khó nhận ra lỗi của mình'],
    workStyle: 'Bạn thích công việc lãnh đạo chiến lược, xây dựng hệ thống hiệu quả. Bạn cần đạt được mục tiêu lớn và công nhân cho thành công.',
    careerFit: ['career-12', 'career-16', 'career-20', 'career-21', 'career-25']
  }
}

export function getPersonality(type: string): Personality {
  return personalities[type] || personalities['INFP']
}

export type Career = {
  id: string
  name: string
  field: string
  description: string
  mbti: string[]
  interests: string[]
  environments: string[]
  skills: string[]
  tasks: string[]
  likes: string
  challenges: string
  study: string
}

const careerNames = [
  'Kỹ sư phần mềm', 'Kỹ sư AI/Machine Learning', 'Nhà khoa học dữ liệu', 'Chuyên viên phân tích dữ liệu', 'Chuyên viên an ninh mạng',
  'UX/UI Designer', 'Kỹ sư cơ khí', 'Kỹ sư điện', 'Kỹ sư điện tử', 'Kỹ sư xây dựng',
  'Kỹ sư ô tô', 'Kỹ sư hàng không', 'Kỹ sư hóa học', 'Kỹ sư môi trường', 'Chuyên viên Marketing',
  'Chuyên viên phân tích kinh doanh', 'Quản lý sản phẩm', 'Chuyên viên tài chính', 'Tư vấn viên', 'Doanh nhân',
  'Quản lý dự án', 'Nhà nghiên cứu khoa học', 'Nhà sinh học', 'Nhà hóa học', 'Nhà khoa học môi trường',
  'Nhà nghiên cứu công nghệ', 'Kiến trúc sư', 'Nhà thiết kế đồ họa', 'Nhà thiết kế sản phẩm', 'Nhiếp ảnh gia',
  'Nhà làm phim', 'Animator', 'Content Creator', 'Giáo viên', 'Chuyên viên nhân sự',
  'Nhà tâm lý học', 'Chuyên viên tư vấn', 'Công tác xã hội', 'Nhà báo', 'Chuyên viên quan hệ công chúng',
  'Copywriter', 'Chuyên viên tổ chức sự kiện'
]

const fieldFor = (n: string) => {
  if (n.includes('Kỹ sư')) return 'Kỹ thuật'
  if (n.includes('dữ liệu') || n.includes('phần mềm') || n.includes('AI') || n.includes('an ninh')) return 'Công nghệ'
  if (n.includes('Marketing') || n.includes('kinh doanh') || n.includes('tài chính') || n.includes('Doanh') || n.includes('Quản lý') || n.includes('Tư vấn')) return 'Kinh doanh'
  if (n.includes('thiết kế') || n.includes('Nhiếp') || n.includes('phim') || n.includes('Animator') || n.includes('Content') || n.includes('Kiến trúc')) return 'Sáng tạo'
  if (n.includes('Nhà nghiên') || n.includes('sinh học') || n.includes('hóa học') || n.includes('môi trường')) return 'Khoa học'
  if (n.includes('Giáo') || n.includes('tâm lý') || n.includes('xã hội') || n.includes('nhân sự')) return 'Xã hội'
  return 'Truyền thông'
}

const mbtiCareerMap: Record<string, number[]> = {
  ISTJ: [0, 12, 20, 21, 31],
  ISFJ: [33, 34, 35, 36, 39],
  INFJ: [34, 36, 37, 38, 39],
  INTJ: [0, 5, 16, 20, 25],
  ISTP: [6, 7, 8, 9, 10],
  ISFP: [5, 27, 28, 29, 30],
  INFP: [33, 38, 39, 40, 41],
  INTP: [0, 1, 2, 3, 22],
  ESTP: [10, 19, 11, 23, 24],
  ESFP: [32, 40, 41, 42, 34],
  ESTJ: [12, 19, 16, 20, 37],
  ESFJ: [34, 35, 37, 36, 42],
  ENFJ: [19, 36, 33, 40, 42],
  ENTP: [0, 1, 14, 17, 25],
  ENTJ: [12, 16, 19, 20, 25],
  ENFP: [32, 40, 41, 42, 39]
}

export const careers: Career[] = careerNames.map((name, i) => ({
  id: `career-${i}`,
  name,
  field: fieldFor(name),
  description: `Khám phá cách ${name.toLowerCase()} biến kiến thức và điểm mạnh thành những kết quả hữu ích trong thực tế.`,
  mbti: Object.keys(mbtiCareerMap).filter(type => mbtiCareerMap[type].includes(i)),
  interests: [['Công nghệ', 'Dữ liệu', 'Giải quyết vấn đề'], ['Ý tưởng', 'Con người', 'Nghiên cứu'], ['Máy móc và thiết bị', 'Giải quyết vấn đề'], ['Thiết kế', 'Viết và giao tiếp', 'Kinh doanh']][i % 4],
  environments: [['Văn phòng', 'Làm việc từ xa'], ['Phòng thí nghiệm', 'Văn phòng'], ['Xưởng/khu vực kỹ thuật', 'Văn phòng'], ['Môi trường kết hợp', 'Ngoài trời']][i % 4],
  skills: ['Tư duy phân tích', 'Giao tiếp rõ ràng', 'Giải quyết vấn đề', 'Khả năng học hỏi'],
  tasks: ['Phân tích nhu cầu và dữ liệu', 'Phối hợp với các bên liên quan', 'Thử nghiệm, cải tiến và trình bày kết quả'],
  likes: 'Bạn có thể thích cảm giác được học hỏi liên tục và thấy sản phẩm của mình tạo ra tác động rõ ràng.',
  challenges: 'Một số giai đoạn có thể đòi hỏi sự kiên nhẫn, kỷ luật hoặc thích nghi với thay đổi.',
  study: 'Hãy bắt đầu bằng một dự án nhỏ, tìm hiểu chương trình đào tạo liên quan và trò chuyện với người đang làm nghề.'
}))

export type Preferences = {
  environments: string[]
  interests: string[]
  priorities: string[]
  social: number
  structure: number
  income: number
}

export const defaultPreferences: Preferences = {
  environments: [],
  interests: [],
  priorities: [],
  social: 3,
  structure: 3,
  income: 3
}

export function scoreAnswers(answers: Record<number, Direction>) {
  const scores: Record<Direction, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  Object.values(answers).forEach(d => scores[d]++)
  
  const type = `${scores.E >= scores.I ? 'E' : 'I'}${scores.S >= scores.N ? 'S' : 'N'}${scores.T >= scores.F ? 'T' : 'F'}${scores.J >= scores.P ? 'J' : 'P'}`
  
  const traits = [
    { left: 'Hướng ngoại', right: 'Hướng nội', percent: Math.round((scores.I / Math.max(1, scores.I + scores.E)) * 100) },
    { left: 'Giác quan', right: 'Trực giác', percent: Math.round((scores.N / Math.max(1, scores.N + scores.S)) * 100) },
    { left: 'Lý trí', right: 'Cảm xúc', percent: Math.round((scores.F / Math.max(1, scores.F + scores.T)) * 100) },
    { left: 'Nguyên tắc', right: 'Linh hoạt', percent: Math.round((scores.P / Math.max(1, scores.P + scores.J)) * 100) }
  ]
  
  return { type, scores, traits }
}

export function matchCareers(type: string, prefs: Preferences) {
  return careers
    .map((career) => {
      const mbti = career.mbti.includes(type) ? 92 : 65
      const interest = prefs.interests.length ? (career.interests.filter(i => prefs.interests.includes(i)).length / Math.max(1, prefs.interests.length)) * 100 : 65
      const env = prefs.environments.length ? (career.environments.filter(e => prefs.environments.includes(e)).length / Math.max(1, prefs.environments.length)) * 100 : 65
      const score = Math.round(mbti * 0.3 + interest * 0.25 + 72 * 0.2 + env * 0.15 + (prefs.priorities.length ? 78 : 65) * 0.1)
      return { career, score: Math.min(98, Math.max(52, score)) }
    })
    .sort((a, b) => b.score - a.score)
}

export const environmentOptions = ['Văn phòng', 'Phòng thí nghiệm', 'Xưởng/khu vực kỹ thuật', 'Ngoài trời', 'Làm việc từ xa', 'Môi trường kết hợp']
export const interestOptions = ['Máy móc và thiết bị', 'Công nghệ', 'Dữ liệu', 'Ý tưởng', 'Thiết kế', 'Con người', 'Nghiên cứu', 'Kinh doanh', 'Viết và giao tiếp', 'Môi trường', 'Giải quyết vấn đề']
export const priorityOptions = ['Thu nhập', 'Cơ hội phát triển', 'Thử thách trí tuệ', 'Tạo ra tác động tích cực', 'Sự sáng tạo', 'Cân bằng cuộc sống', 'Được làm việc thực tế', 'Cơ hội quốc tế', 'Thành tựu', 'Sự ổn định']
export const fieldOptions = ['Tất cả', 'Công nghệ', 'Kỹ thuật', 'Kinh doanh', 'Khoa học', 'Sáng tạo', 'Xã hội', 'Truyền thông']

export type AppState = {
  screen: string
  answers: Record<number, Direction>
  result?: ReturnType<typeof scoreAnswers>
  preferences: Preferences
  selectedCareer?: string
}

export const initialState: AppState = {
  screen: 'home',
  answers: {},
  preferences: defaultPreferences
}

export function personalize(career: Career, type: string, prefs: Preferences) {
  const matchingInterest = career.interests.find(i => prefs.interests.includes(i))
  const p = getPersonality(type)
  return `Câu trả lời của bạn cho thấy bạn có xu hướng ${matchingInterest ? `quan tâm đến ${matchingInterest.toLowerCase()}, ` : ''}${p.workStyle.toLowerCase()} Những yếu tố này thường xuất hiện trong công việc của một ${career.name.toLowerCase()}.`
}
