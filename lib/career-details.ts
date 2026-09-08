import { type Career, type Preferences, getPersonality } from './pathfinder-data'

export type SalaryLevel = { label: string; range: string }
export type RoadmapStep = { stage: string; title: string; desc: string }

export type CareerDetail = {
  overview: string
  dailyWork: string[]
  workEnvironment: string
  pros: string[]
  challenges: string[]
  skills: string[]
  tools: string[]
  majors: string[]
  subjects: string[]
  roadmap: RoadmapStep[]
  futures: string[]
  salary: SalaryLevel[]
  marketDemand: string
  overseas: string
}

type FieldBase = Omit<CareerDetail, 'overview'>

const roadmapTemplate = (
  hs: string,
  uni: string,
  intern: string,
  junior: string,
  specialist: string,
  senior: string
): RoadmapStep[] => [
  { stage: 'Học sinh THPT', title: 'Xây nền tảng', desc: hs },
  { stage: 'Đại học / Cao đẳng', title: 'Học chuyên ngành', desc: uni },
  { stage: 'Thực tập sinh', title: 'Va chạm thực tế', desc: intern },
  { stage: 'Người mới đi làm', title: 'Junior', desc: junior },
  { stage: 'Chuyên viên', title: 'Vững chuyên môn', desc: specialist },
  { stage: 'Cấp cao / Quản lý', title: 'Dẫn dắt', desc: senior },
]

const fieldBase: Record<string, FieldBase> = {
  'Công nghệ': {
    dailyWork: [
      'Phân tích yêu cầu và chia nhỏ vấn đề thành các phần có thể xử lý',
      'Viết, kiểm thử và tối ưu mã nguồn hoặc mô hình dữ liệu',
      'Họp nhanh với nhóm để đồng bộ tiến độ (daily stand-up)',
      'Rà soát code, xử lý lỗi và cải thiện hiệu năng hệ thống',
      'Cập nhật công nghệ mới và tài liệu hóa những gì đã làm',
    ],
    workEnvironment:
      'Chủ yếu làm việc tại văn phòng công nghệ hiện đại hoặc từ xa, theo nhóm Agile/Scrum. Thời gian linh hoạt nhưng có giai đoạn cao điểm khi ra mắt sản phẩm.',
    pros: [
      'Mức lương cạnh tranh và tăng nhanh theo năng lực',
      'Nhu cầu tuyển dụng lớn, dễ làm việc từ xa hoặc cho công ty nước ngoài',
      'Được học hỏi liên tục và thấy sản phẩm mình làm ra tác động thật',
    ],
    challenges: [
      'Công nghệ thay đổi nhanh, phải học liên tục để không tụt lại',
      'Áp lực deadline và xử lý sự cố ngoài giờ ở giai đoạn cao điểm',
      'Ngồi máy tính nhiều, cần chủ động giữ sức khỏe và cân bằng',
    ],
    skills: ['Tư duy logic và giải quyết vấn đề', 'Lập trình / phân tích dữ liệu', 'Tiếng Anh chuyên ngành', 'Tự học nhanh', 'Làm việc nhóm'],
    tools: ['VS Code', 'Git & GitHub', 'Python / JavaScript', 'SQL', 'Docker', 'Jira'],
    majors: ['Khoa học máy tính', 'Kỹ thuật phần mềm', 'Công nghệ thông tin', 'Khoa học dữ liệu', 'An toàn thông tin'],
    subjects: ['Toán', 'Tin học', 'Tiếng Anh', 'Vật lý'],
    roadmap: roadmapTemplate(
      'Học chắc Toán và Tin học, tự làm quen lập trình cơ bản (Python), tham gia câu lạc bộ tin học hoặc cuộc thi lập trình.',
      'Theo học ngành CNTT/Khoa học máy tính, làm dự án cá nhân, xây portfolio trên GitHub và học thêm khóa online.',
      'Thực tập tại công ty công nghệ, học quy trình làm việc nhóm, đọc code người khác và nhận mentor hướng dẫn.',
      'Đảm nhận tính năng nhỏ, sửa lỗi, viết test và dần làm chủ một phần của sản phẩm.',
      'Thiết kế giải pháp cho module lớn, hướng dẫn người mới và tối ưu hệ thống.',
      'Trở thành Tech Lead / Kiến trúc sư hệ thống hoặc quản lý kỹ thuật, định hình chiến lược công nghệ.'
    ),
    futures: [
      'AI, dữ liệu lớn và điện toán đám mây tiếp tục mở rộng cơ hội việc làm',
      'Có thể phát triển thành chuyên gia (IC) hoặc rẽ sang quản lý sản phẩm/kỹ thuật',
      'Cơ hội khởi nghiệp công nghệ hoặc làm freelancer quốc tế',
    ],
    salary: [
      { label: 'Mới ra trường (0-2 năm)', range: '12 - 20 triệu/tháng' },
      { label: 'Chuyên viên (2-5 năm)', range: '20 - 45 triệu/tháng' },
      { label: 'Cấp cao / quản lý (5+ năm)', range: '45 - 100+ triệu/tháng' },
    ],
    marketDemand:
      'Rất cao. Việt Nam đang thiếu hụt nhân lực công nghệ chất lượng, đặc biệt về AI, dữ liệu và an ninh mạng. Đây là một trong những nhóm nghề tuyển dụng mạnh nhất hiện nay.',
    overseas:
      'Rất nhiều cơ hội. Kỹ năng công nghệ mang tính toàn cầu, bạn có thể làm remote cho công ty nước ngoài hoặc xin visa tay nghề ở Mỹ, châu Âu, Singapore, Nhật Bản nếu giỏi chuyên môn và tiếng Anh.',
  },
  'Kỹ thuật': {
    dailyWork: [
      'Đọc bản vẽ, thông số kỹ thuật và tính toán thiết kế',
      'Giám sát, vận hành hoặc thử nghiệm thiết bị, hệ thống',
      'Phối hợp với các bộ phận để đảm bảo tiến độ và an toàn',
      'Xử lý sự cố kỹ thuật và đề xuất cải tiến',
      'Lập báo cáo, tài liệu kỹ thuật và tuân thủ tiêu chuẩn',
    ],
    workEnvironment:
      'Kết hợp giữa văn phòng thiết kế và hiện trường (nhà máy, công trường, phòng kỹ thuật). Thường theo dự án, đôi khi cần đi công tác và tuân thủ quy định an toàn nghiêm ngặt.',
    pros: [
      'Công việc cụ thể, thấy rõ kết quả vật lý mình tạo ra',
      'Nền tảng vững, ổn định và được xã hội trọng dụng',
      'Có thể chuyển đổi giữa nhiều ngành công nghiệp',
    ],
    challenges: [
      'Trách nhiệm cao vì liên quan an toàn và chi phí lớn',
      'Có thể làm việc ngoài trời, môi trường bụi/ồn ở hiện trường',
      'Cần chứng chỉ hành nghề và cập nhật tiêu chuẩn kỹ thuật',
    ],
    skills: ['Tư duy kỹ thuật và tính toán', 'Đọc hiểu bản vẽ', 'Giải quyết vấn đề thực tế', 'Cẩn thận, tuân thủ an toàn', 'Quản lý dự án'],
    tools: ['AutoCAD', 'SolidWorks / MATLAB', 'Excel kỹ thuật', 'Thiết bị đo lường', 'Phần mềm mô phỏng'],
    majors: ['Kỹ thuật cơ khí', 'Kỹ thuật điện - điện tử', 'Kỹ thuật xây dựng', 'Kỹ thuật ô tô', 'Kỹ thuật hóa học / môi trường'],
    subjects: ['Toán', 'Vật lý', 'Hóa học', 'Tiếng Anh'],
    roadmap: roadmapTemplate(
      'Học tốt Toán - Lý - Hóa, rèn tư duy không gian, tham gia các cuộc thi khoa học kỹ thuật (KHKT).',
      'Theo học ngành kỹ thuật, làm đồ án, thực hành trong phòng lab và tìm hiểu tiêu chuẩn ngành.',
      'Thực tập tại nhà máy/công ty kỹ thuật, học quy trình sản xuất và an toàn lao động.',
      'Làm kỹ sư hiện trường/thiết kế, hỗ trợ dự án và tích lũy kinh nghiệm thực tế.',
      'Chủ trì hạng mục kỹ thuật, lấy chứng chỉ hành nghề, tối ưu quy trình.',
      'Trở thành kỹ sư trưởng, quản lý dự án hoặc giám đốc kỹ thuật.'
    ),
    futures: [
      'Tự động hóa, năng lượng tái tạo và sản xuất thông minh tạo nhu cầu mới',
      'Có thể chuyển sang quản lý dự án, tư vấn kỹ thuật hoặc R&D',
      'Cơ hội tham gia các dự án hạ tầng lớn trong và ngoài nước',
    ],
    salary: [
      { label: 'Mới ra trường (0-2 năm)', range: '9 - 15 triệu/tháng' },
      { label: 'Chuyên viên (2-5 năm)', range: '15 - 35 triệu/tháng' },
      { label: 'Cấp cao / quản lý (5+ năm)', range: '35 - 80+ triệu/tháng' },
    ],
    marketDemand:
      'Ổn định và cao ở các ngành sản xuất, xây dựng, năng lượng. Việt Nam thu hút nhiều nhà máy FDI nên kỹ sư giỏi tiếng Anh và chuyên môn rất được săn đón.',
    overseas:
      'Nhiều cơ hội, đặc biệt ở Nhật Bản, Đức, Úc và Trung Đông cho kỹ sư có chứng chỉ quốc tế. Kỹ năng ngoại ngữ và kinh nghiệm dự án lớn là lợi thế then chốt.',
  },
  'Kinh doanh': {
    dailyWork: [
      'Phân tích thị trường, số liệu và nhu cầu khách hàng',
      'Lập kế hoạch, đề xuất và trình bày với các bên liên quan',
      'Theo dõi mục tiêu (KPI), ngân sách và hiệu quả công việc',
      'Đàm phán, xây dựng quan hệ và điều phối nhóm',
      'Ra quyết định dựa trên dữ liệu và điều chỉnh chiến lược',
    ],
    workEnvironment:
      'Chủ yếu tại văn phòng, họp nhiều và tương tác với nhiều bộ phận, khách hàng, đối tác. Nhịp độ nhanh, hướng kết quả và có thể đi công tác.',
    pros: [
      'Cơ hội thăng tiến rõ ràng và thu nhập gắn với hiệu quả',
      'Mạng lưới quan hệ rộng, học được cách vận hành tổ chức',
      'Kỹ năng linh hoạt, áp dụng được ở nhiều lĩnh vực',
    ],
    challenges: [
      'Áp lực chỉ tiêu và kết quả kinh doanh',
      'Phải cân bằng nhiều bên với lợi ích khác nhau',
      'Đòi hỏi giao tiếp tốt và khả năng chịu áp lực cao',
    ],
    skills: ['Giao tiếp và thuyết phục', 'Tư duy phân tích số liệu', 'Đàm phán', 'Quản lý thời gian', 'Lãnh đạo'],
    tools: ['Excel / Google Sheets', 'PowerPoint', 'CRM (Salesforce, HubSpot)', 'Power BI / Tableau', 'Notion / Trello'],
    majors: ['Quản trị kinh doanh', 'Marketing', 'Tài chính - Ngân hàng', 'Kinh tế', 'Kinh doanh quốc tế'],
    subjects: ['Toán', 'Tiếng Anh', 'Ngữ văn', 'Giáo dục kinh tế và pháp luật'],
    roadmap: roadmapTemplate(
      'Rèn giao tiếp, tham gia hoạt động ngoại khóa/CLB, tập tổ chức sự kiện nhỏ và học tốt Toán - Tiếng Anh.',
      'Học ngành kinh tế/quản trị, tham gia cuộc thi khởi nghiệp, đi làm thêm để hiểu khách hàng.',
      'Thực tập ở phòng kinh doanh/marketing, học quy trình và công cụ thực tế.',
      'Làm nhân viên kinh doanh/phân tích, đạt chỉ tiêu và hiểu sản phẩm.',
      'Trở thành chuyên viên/trưởng nhóm, xây chiến lược và dẫn dắt dự án.',
      'Lên quản lý, giám đốc bộ phận hoặc tự khởi nghiệp.'
    ),
    futures: [
      'Thương mại điện tử, dữ liệu và AI marketing mở ra vai trò mới',
      'Có thể chuyên sâu (tài chính, phân tích) hoặc lên quản lý điều hành',
      'Nền tảng tốt để khởi nghiệp riêng',
    ],
    salary: [
      { label: 'Mới ra trường (0-2 năm)', range: '8 - 15 triệu/tháng (+ thưởng)' },
      { label: 'Chuyên viên (2-5 năm)', range: '15 - 35 triệu/tháng' },
      { label: 'Cấp cao / quản lý (5+ năm)', range: '35 - 90+ triệu/tháng' },
    ],
    marketDemand:
      'Cao và đa dạng. Mọi doanh nghiệp đều cần người kinh doanh, marketing, tài chính. Người biết kết hợp dữ liệu và công nghệ có lợi thế lớn.',
    overseas:
      'Có cơ hội qua các tập đoàn đa quốc gia, đặc biệt ở mảng kinh doanh quốc tế, tài chính. Tiếng Anh và tư duy toàn cầu là yếu tố quyết định.',
  },
  'Khoa học': {
    dailyWork: [
      'Thiết kế và thực hiện thí nghiệm, thu thập dữ liệu',
      'Phân tích, diễn giải kết quả và kiểm chứng giả thuyết',
      'Đọc tài liệu, cập nhật nghiên cứu mới nhất',
      'Viết báo cáo, bài báo khoa học và trình bày kết quả',
      'Hợp tác với nhóm nghiên cứu và xin tài trợ dự án',
    ],
    workEnvironment:
      'Chủ yếu ở phòng thí nghiệm, viện nghiên cứu hoặc trường đại học, đôi khi khảo sát thực địa. Công việc đòi hỏi kiên nhẫn, tỉ mỉ và tư duy độc lập.',
    pros: [
      'Được theo đuổi đam mê khám phá và tạo tri thức mới',
      'Đóng góp trực tiếp cho khoa học và xã hội',
      'Môi trường trí tuệ, hợp tác quốc tế',
    ],
    challenges: [
      'Kết quả cần thời gian dài, đôi khi thất bại nhiều lần',
      'Cạnh tranh về tài trợ và vị trí nghiên cứu',
      'Thường cần học lên cao (Thạc sĩ, Tiến sĩ)',
    ],
    skills: ['Tư duy phản biện', 'Phương pháp nghiên cứu', 'Phân tích thống kê', 'Kiên nhẫn, tỉ mỉ', 'Viết học thuật'],
    tools: ['Thiết bị phòng lab', 'Python / R', 'SPSS / MATLAB', 'LaTeX', 'Cơ sở dữ liệu học thuật'],
    majors: ['Sinh học', 'Hóa học', 'Vật lý', 'Khoa học môi trường', 'Công nghệ sinh học'],
    subjects: ['Toán', 'Hóa học', 'Sinh học', 'Vật lý', 'Tiếng Anh'],
    roadmap: roadmapTemplate(
      'Học chắc các môn khoa học tự nhiên, tham gia nghiên cứu KHKT, đọc sách khoa học và rèn tiếng Anh.',
      'Học ngành khoa học, tham gia lab của giảng viên, làm khóa luận và công bố nhỏ.',
      'Thực tập/trợ lý nghiên cứu, học kỹ năng thí nghiệm và phân tích dữ liệu.',
      'Làm nghiên cứu viên, hỗ trợ dự án và bắt đầu công bố khoa học.',
      'Chủ trì đề tài, học lên Thạc sĩ/Tiến sĩ, hướng dẫn sinh viên.',
      'Trở thành nhà khoa học chính, trưởng nhóm nghiên cứu hoặc giáo sư.'
    ),
    futures: [
      'Công nghệ sinh học, năng lượng và môi trường là hướng phát triển mạnh',
      'Có thể chuyển sang R&D doanh nghiệp, dữ liệu hoặc giảng dạy',
      'Cơ hội hợp tác và học bổng nghiên cứu quốc tế',
    ],
    salary: [
      { label: 'Mới ra trường (0-2 năm)', range: '8 - 14 triệu/tháng' },
      { label: 'Nghiên cứu viên (2-5 năm)', range: '14 - 30 triệu/tháng' },
      { label: 'Cấp cao / chủ nhiệm (5+ năm)', range: '30 - 70+ triệu/tháng' },
    ],
    marketDemand:
      'Ổn định ở viện nghiên cứu, trường học và ngày càng tăng ở R&D doanh nghiệp (dược, thực phẩm, môi trường). Người biết kết hợp khoa học với dữ liệu rất được ưa chuộng.',
    overseas:
      'Rất rộng mở qua học bổng Thạc sĩ/Tiến sĩ và vị trí nghiên cứu ở Mỹ, châu Âu, Úc, Nhật, Hàn. Công bố khoa học tốt và tiếng Anh là chìa khóa.',
  },
  'Sáng tạo': {
    dailyWork: [
      'Tìm ý tưởng, phác thảo và xây dựng concept',
      'Thiết kế/sản xuất sản phẩm sáng tạo (hình ảnh, sản phẩm, nội dung)',
      'Trao đổi với khách hàng hoặc nhóm để hiểu yêu cầu',
      'Chỉnh sửa dựa trên phản hồi và hoàn thiện sản phẩm',
      'Cập nhật xu hướng thẩm mỹ và công cụ mới',
    ],
    workEnvironment:
      'Studio sáng tạo, agency hoặc làm việc tự do (freelance). Linh hoạt về thời gian nhưng chịu áp lực deadline và thị hiếu khách hàng.',
    pros: [
      'Được thể hiện cá tính và tạo ra sản phẩm mang dấu ấn riêng',
      'Linh hoạt, dễ làm tự do hoặc dự án quốc tế',
      'Nhu cầu nội dung số ngày càng lớn',
    ],
    challenges: [
      'Thu nhập có thể không đều, nhất là khi mới bắt đầu',
      'Áp lực sáng tạo liên tục và bị đánh giá chủ quan',
      'Cần xây dựng portfolio và thương hiệu cá nhân',
    ],
    skills: ['Tư duy thẩm mỹ', 'Sáng tạo ý tưởng', 'Kỹ năng phần mềm thiết kế', 'Kể chuyện (storytelling)', 'Tiếp nhận phản hồi'],
    tools: ['Figma', 'Adobe Photoshop / Illustrator', 'Premiere / After Effects', 'Procreate', 'Canva'],
    majors: ['Thiết kế đồ họa', 'Thiết kế công nghiệp', 'Kiến trúc', 'Mỹ thuật ứng dụng', 'Truyền thông đa phương tiện'],
    subjects: ['Ngữ văn', 'Tiếng Anh', 'Mỹ thuật', 'Tin học'],
    roadmap: roadmapTemplate(
      'Rèn vẽ/thẩm mỹ, làm sản phẩm sáng tạo cá nhân, học phần mềm thiết kế cơ bản và xây portfolio.',
      'Học ngành thiết kế/mỹ thuật, làm dự án thật, nhận việc freelance nhỏ để tích lũy.',
      'Thực tập tại studio/agency, học quy trình làm việc với khách hàng.',
      'Làm designer/creator, hoàn thiện portfolio và phong cách riêng.',
      'Trở thành senior/art director, dẫn dắt ý tưởng cho dự án lớn.',
      'Lên creative director, mở studio riêng hoặc xây thương hiệu cá nhân.'
    ),
    futures: [
      'Nội dung số, thương hiệu và trải nghiệm người dùng bùng nổ nhu cầu',
      'AI hỗ trợ sáng tạo giúp tăng năng suất nếu biết tận dụng',
      'Cơ hội làm việc quốc tế và tự xây thương hiệu cá nhân',
    ],
    salary: [
      { label: 'Mới vào nghề (0-2 năm)', range: '8 - 15 triệu/tháng' },
      { label: 'Chuyên viên (2-5 năm)', range: '15 - 35 triệu/tháng' },
      { label: 'Cấp cao / director (5+ năm)', range: '35 - 80+ triệu/tháng' },
    ],
    marketDemand:
      'Tăng mạnh nhờ nội dung số, mạng xã hội và thương mại điện tử. Người có portfolio tốt và biết kết hợp công cụ AI luôn có việc.',
    overseas:
      'Rất thuận lợi vì có thể làm remote/freelance cho khách hàng toàn cầu qua các nền tảng quốc tế. Portfolio mạnh quan trọng hơn bằng cấp.',
  },
  'Xã hội': {
    dailyWork: [
      'Lắng nghe, tư vấn và hỗ trợ con người',
      'Lập kế hoạch chương trình giáo dục/hỗ trợ',
      'Quan sát, đánh giá nhu cầu và theo dõi tiến bộ',
      'Phối hợp với gia đình, tổ chức và cộng đồng',
      'Ghi chép hồ sơ và cập nhật kiến thức chuyên môn',
    ],
    workEnvironment:
      'Trường học, bệnh viện, trung tâm tư vấn, tổ chức xã hội hoặc doanh nghiệp (nhân sự). Tương tác con người nhiều, cần sự đồng cảm và kiên nhẫn.',
    pros: [
      'Công việc ý nghĩa, giúp đỡ và tạo tác động tích cực cho người khác',
      'Được kết nối, thấu hiểu con người sâu sắc',
      'Nhu cầu ổn định và ngày càng được coi trọng',
    ],
    challenges: [
      'Dễ mệt mỏi cảm xúc khi đồng hành với vấn đề của người khác',
      'Thu nhập khởi điểm không quá cao ở một số vị trí',
      'Cần kiên nhẫn và ranh giới cảm xúc rõ ràng',
    ],
    skills: ['Đồng cảm và lắng nghe', 'Giao tiếp', 'Giải quyết xung đột', 'Kiên nhẫn', 'Tổ chức chương trình'],
    tools: ['Công cụ khảo sát/đánh giá', 'Nền tảng học tập (LMS)', 'Phần mềm quản lý hồ sơ', 'Google Workspace'],
    majors: ['Tâm lý học', 'Sư phạm', 'Công tác xã hội', 'Quản trị nhân sự', 'Xã hội học'],
    subjects: ['Ngữ văn', 'Tiếng Anh', 'Lịch sử', 'Giáo dục công dân', 'Sinh học'],
    roadmap: roadmapTemplate(
      'Tham gia hoạt động tình nguyện/CLB, rèn giao tiếp - lắng nghe, học tốt Văn và Tiếng Anh.',
      'Học ngành tâm lý/sư phạm/CTXH, thực hành hỗ trợ cộng đồng và tích lũy trải nghiệm.',
      'Thực tập tại trường/trung tâm/tổ chức, học kỹ năng tư vấn thực tế.',
      'Làm chuyên viên hỗ trợ/giáo viên, xây dựng chương trình cơ bản.',
      'Trở thành chuyên gia, có chứng chỉ hành nghề và hướng dẫn người mới.',
      'Lên quản lý chương trình, chuyên gia tư vấn cấp cao hoặc điều hành tổ chức.'
    ),
    futures: [
      'Sức khỏe tinh thần, giáo dục và phát triển con người ngày càng được quan tâm',
      'Có thể chuyên sâu (tham vấn tâm lý, đào tạo) hoặc lên quản lý',
      'Cơ hội làm việc với tổ chức phi chính phủ và quốc tế',
    ],
    salary: [
      { label: 'Mới vào nghề (0-2 năm)', range: '7 - 13 triệu/tháng' },
      { label: 'Chuyên viên (2-5 năm)', range: '13 - 28 triệu/tháng' },
      { label: 'Cấp cao / quản lý (5+ năm)', range: '28 - 60+ triệu/tháng' },
    ],
    marketDemand:
      'Tăng dần, đặc biệt về tâm lý học đường, nhân sự và giáo dục kỹ năng. Xã hội ngày càng chú trọng sức khỏe tinh thần và phát triển con người.',
    overseas:
      'Có cơ hội qua tổ chức quốc tế, NGO và các chương trình giáo dục. Một số nghề cần chứng chỉ và ngôn ngữ bản địa nên đòi hỏi chuẩn bị kỹ.',
  },
  'Truyền thông': {
    dailyWork: [
      'Tìm đề tài, thu thập thông tin và phỏng vấn',
      'Viết, biên tập nội dung hoặc sản xuất chương trình',
      'Lên kế hoạch nội dung và phối hợp với nhóm sản xuất',
      'Theo dõi phản hồi, số liệu và điều chỉnh nội dung',
      'Cập nhật xu hướng truyền thông và mạng xã hội',
    ],
    workEnvironment:
      'Tòa soạn, công ty truyền thông, agency hoặc làm tự do. Nhịp độ nhanh, bám sát tin tức và xu hướng, đôi khi cần đi hiện trường.',
    pros: [
      'Công việc năng động, đa dạng và luôn mới mẻ',
      'Được kể câu chuyện, lan tỏa thông tin và ảnh hưởng cộng đồng',
      'Dễ xây thương hiệu cá nhân và làm việc linh hoạt',
    ],
    challenges: [
      'Áp lực deadline và độ chính xác cao',
      'Thu nhập khởi điểm có thể khiêm tốn',
      'Phải liên tục sáng tạo và thích nghi với nền tảng mới',
    ],
    skills: ['Viết và biên tập', 'Giao tiếp', 'Nhạy bén thông tin', 'Sáng tạo nội dung', 'Phân tích khán giả'],
    tools: ['CMS / WordPress', 'Canva / Figma', 'Premiere / CapCut', 'Google Analytics', 'Mạng xã hội (Meta, TikTok)'],
    majors: ['Báo chí', 'Truyền thông đa phương tiện', 'Quan hệ công chúng', 'Marketing', 'Ngôn ngữ / Văn học'],
    subjects: ['Ngữ văn', 'Tiếng Anh', 'Lịch sử', 'Tin học'],
    roadmap: roadmapTemplate(
      'Rèn viết lách, làm báo tường/CLB truyền thông, xây kênh cá nhân nhỏ và học tốt Văn - Tiếng Anh.',
      'Học ngành báo chí/truyền thông, cộng tác viết bài, sản xuất nội dung để có portfolio.',
      'Thực tập tại tòa soạn/agency, học quy trình sản xuất và làm việc nhóm.',
      'Làm phóng viên/content, sản xuất nội dung đều đặn và xây phong cách.',
      'Trở thành biên tập viên/chuyên viên cấp cao, dẫn dắt tuyến nội dung.',
      'Lên quản lý nội dung, giám đốc truyền thông hoặc xây thương hiệu riêng.'
    ),
    futures: [
      'Nội dung số, podcast và video ngắn tiếp tục tăng trưởng',
      'Có thể chuyển sang truyền thông thương hiệu, PR hoặc sáng tạo độc lập',
      'Cơ hội hợp tác với thương hiệu và nền tảng quốc tế',
    ],
    salary: [
      { label: 'Mới vào nghề (0-2 năm)', range: '7 - 14 triệu/tháng' },
      { label: 'Chuyên viên (2-5 năm)', range: '14 - 30 triệu/tháng' },
      { label: 'Cấp cao / quản lý (5+ năm)', range: '30 - 70+ triệu/tháng' },
    ],
    marketDemand:
      'Cao ở mảng nội dung số và truyền thông thương hiệu. Người biết sản xuất đa nền tảng và hiểu dữ liệu khán giả rất được săn đón.',
    overseas:
      'Có cơ hội qua truyền thông quốc tế, sáng tạo nội dung đa ngôn ngữ và cộng tác từ xa. Tiếng Anh và kỹ năng đa phương tiện là lợi thế lớn.',
  },
}

const nameOverrides: Record<string, Partial<CareerDetail>> = {
  'Kỹ sư phần mềm': {
    overview:
      'Kỹ sư phần mềm thiết kế, xây dựng và bảo trì các ứng dụng, website và hệ thống phần mềm phục vụ hàng triệu người dùng.',
    tools: ['VS Code', 'Git & GitHub', 'TypeScript / Java / Go', 'React & Node.js', 'Docker & Kubernetes', 'AWS'],
    majors: ['Kỹ thuật phần mềm', 'Khoa học máy tính', 'Công nghệ thông tin'],
  },
  'Kỹ sư AI/Machine Learning': {
    overview:
      'Kỹ sư AI/ML xây dựng các mô hình học máy giúp máy tính nhận diện, dự đoán và ra quyết định thông minh từ dữ liệu.',
    skills: ['Toán và xác suất thống kê', 'Lập trình Python', 'Học máy & học sâu', 'Xử lý dữ liệu', 'Tư duy nghiên cứu'],
    tools: ['Python', 'PyTorch / TensorFlow', 'Jupyter', 'Hugging Face', 'SQL', 'GPU / Cloud'],
    majors: ['Khoa học máy tính', 'Khoa học dữ liệu', 'Trí tuệ nhân tạo', 'Toán - Tin'],
  },
  'Nhà khoa học dữ liệu': {
    overview:
      'Nhà khoa học dữ liệu biến dữ liệu thô thành insight và mô hình dự đoán, giúp doanh nghiệp ra quyết định tốt hơn.',
    skills: ['Thống kê', 'Python / R', 'Học máy', 'Kể chuyện bằng dữ liệu', 'Kiến thức nghiệp vụ'],
    tools: ['Python', 'SQL', 'Pandas / scikit-learn', 'Power BI / Tableau', 'Jupyter'],
    majors: ['Khoa học dữ liệu', 'Toán ứng dụng - Thống kê', 'Khoa học máy tính'],
  },
  'Chuyên viên an ninh mạng': {
    overview:
      'Chuyên viên an ninh mạng bảo vệ hệ thống, dữ liệu và người dùng khỏi tấn công mạng, phát hiện và xử lý lỗ hổng bảo mật.',
    skills: ['Mạng máy tính', 'Tư duy tấn công - phòng thủ', 'Phân tích sự cố', 'Lập trình cơ bản', 'Cẩn trọng, đạo đức nghề'],
    tools: ['Kali Linux', 'Wireshark', 'Burp Suite', 'SIEM', 'Python'],
    majors: ['An toàn thông tin', 'Khoa học máy tính', 'Công nghệ thông tin'],
  },
  'UX/UI Designer': {
    overview:
      'UX/UI Designer thiết kế trải nghiệm và giao diện sản phẩm số sao cho dễ dùng, đẹp và mang lại giá trị cho người dùng.',
    skills: ['Tư duy người dùng', 'Nghiên cứu UX', 'Thiết kế giao diện', 'Prototyping', 'Giao tiếp với lập trình viên'],
    tools: ['Figma', 'Adobe XD', 'Sketch', 'Miro', 'Framer'],
    majors: ['Thiết kế đồ họa', 'Truyền thông đa phương tiện', 'Tương tác người - máy (HCI)', 'Khoa học máy tính'],
    subjects: ['Mỹ thuật', 'Tin học', 'Tiếng Anh', 'Toán'],
  },
  'Giáo viên': {
    overview:
      'Giáo viên truyền đạt kiến thức, kỹ năng và truyền cảm hứng cho học sinh, đồng hành cùng sự trưởng thành của các em.',
    skills: ['Truyền đạt dễ hiểu', 'Kiên nhẫn', 'Quản lý lớp học', 'Đồng cảm', 'Thiết kế bài giảng'],
    tools: ['Google Classroom', 'PowerPoint / Canva', 'LMS', 'Công cụ kiểm tra trực tuyến'],
    majors: ['Sư phạm', 'Chuyên ngành giảng dạy (Toán, Văn, Anh...)', 'Quản lý giáo dục'],
  },
  'Nhà tâm lý học': {
    overview:
      'Nhà tâm lý học nghiên cứu và hỗ trợ sức khỏe tinh thần, giúp con người hiểu bản thân và vượt qua khó khăn tâm lý.',
    skills: ['Lắng nghe sâu', 'Đánh giá tâm lý', 'Đồng cảm', 'Kiến thức chuyên môn', 'Giữ ranh giới nghề nghiệp'],
    tools: ['Công cụ đánh giá tâm lý', 'Hồ sơ ca', 'Nền tảng tư vấn trực tuyến'],
    majors: ['Tâm lý học', 'Tâm lý học lâm sàng', 'Công tác xã hội'],
  },
  'Doanh nhân': {
    overview:
      'Doanh nhân xây dựng và điều hành doanh nghiệp riêng, biến ý tưởng thành sản phẩm/dịch vụ tạo ra giá trị và việc làm.',
    skills: ['Tư duy chiến lược', 'Chấp nhận rủi ro', 'Lãnh đạo', 'Bán hàng & gọi vốn', 'Kiên trì'],
    tools: ['Excel tài chính', 'Notion', 'CRM', 'Công cụ marketing số'],
    majors: ['Quản trị kinh doanh', 'Kinh doanh quốc tế', 'Marketing', 'Tài chính'],
  },
  'Kiến trúc sư': {
    overview:
      'Kiến trúc sư thiết kế công trình và không gian sống vừa đẹp, vừa an toàn và tiện dụng, cân bằng thẩm mỹ với kỹ thuật.',
    skills: ['Tư duy không gian', 'Thẩm mỹ', 'Kỹ thuật xây dựng', 'Vẽ và mô hình 3D', 'Giao tiếp với khách hàng'],
    tools: ['AutoCAD', 'SketchUp', 'Revit', 'Lumion', 'Photoshop'],
    majors: ['Kiến trúc', 'Quy hoạch đô thị', 'Thiết kế nội thất'],
    subjects: ['Toán', 'Vật lý', 'Mỹ thuật', 'Tiếng Anh'],
  },
}

export function getCareerDetail(career: Career): CareerDetail {
  const base = fieldBase[career.field] || fieldBase['Công nghệ']
  const override = nameOverrides[career.name] || {}
  const overview =
    override.overview ||
    `${career.name} là một nghề thuộc lĩnh vực ${career.field.toLowerCase()}, nơi bạn vận dụng kiến thức và điểm mạnh của mình để tạo ra giá trị thực tế. ${career.description}`
  return {
    overview,
    dailyWork: override.dailyWork || base.dailyWork,
    workEnvironment: override.workEnvironment || base.workEnvironment,
    pros: override.pros || base.pros,
    challenges: override.challenges || base.challenges,
    skills: override.skills || base.skills,
    tools: override.tools || base.tools,
    majors: override.majors || base.majors,
    subjects: override.subjects || base.subjects,
    roadmap: override.roadmap || base.roadmap,
    futures: override.futures || base.futures,
    salary: override.salary || base.salary,
    marketDemand: override.marketDemand || base.marketDemand,
    overseas: override.overseas || base.overseas,
  }
}

export function careerReason(career: Career, type: string, prefs: Preferences, score: number): string {
  const p = getPersonality(type)
  const parts: string[] = []
  if (career.mbti.includes(type)) {
    parts.push(`nhóm tính cách ${type} của bạn thường hợp với ${career.name.toLowerCase()}`)
  } else {
    parts.push(`bạn vẫn có thể phát huy điểm mạnh "${p.strengths[0].toLowerCase()}" trong nghề này`)
  }
  const sharedInterest = career.interests.find((i) => prefs.interests.includes(i))
  if (sharedInterest) parts.push(`bạn quan tâm đến ${sharedInterest.toLowerCase()}`)
  const sharedEnv = career.environments.find((e) => prefs.environments.includes(e))
  if (sharedEnv) parts.push(`môi trường ${sharedEnv.toLowerCase()} phù hợp với mong muốn của bạn`)
  const reason = parts.join('; ')
  return `Mức phù hợp ${score}% vì ${reason}.`
}
