'use client'

import { useMemo } from 'react'
import {
  ArrowLeft,
  Check,
  Sparkles,
  ListChecks,
  Building2,
  ThumbsUp,
  AlertTriangle,
  Wrench,
  GraduationCap,
  BookOpen,
  Route,
  TrendingUp,
  Coins,
  LineChart,
  Globe,
} from 'lucide-react'
import {
  careers,
  matchCareers,
  scoreAnswers,
  getPersonality,
  personalize,
  type AppState,
} from '@/lib/pathfinder-data'
import { getCareerDetail, careerReason } from '@/lib/career-details'
import { PathfinderChat } from '@/components/pathfinder-chat'
import type { ChatContext } from '@/app/api/chat/route'

function Card({
  icon,
  title,
  children,
  className = '',
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-3xl border border-[#dbe4e8] bg-white p-7 ${className}`}>
      <h2 className="flex items-center gap-2.5 text-lg font-semibold text-[#102a43]">
        <span className="grid size-9 place-items-center rounded-xl bg-[#e2f0ea] text-[#2e8277]">{icon}</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-sm leading-6 text-[#587083]">
      {items.map((x) => (
        <li key={x} className="flex gap-2">
          <Check className="mt-1 size-4 shrink-0 text-[#2e8277]" />
          {x}
        </li>
      ))}
    </ul>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => (
        <span key={x} className="rounded-full border border-[#dbe4e8] bg-[#f6f5ef] px-3.5 py-1.5 text-sm text-[#3f5b6a]">
          {x}
        </span>
      ))}
    </div>
  )
}

export function CareerDetail({ state, go }: { state: AppState; go: (s: string) => void }) {
  const result = state.result || scoreAnswers(state.answers)
  const career = careers.find((c) => c.id === state.selectedCareer) || careers[0]
  const detail = useMemo(() => getCareerDetail(career), [career])
  const personality = getPersonality(result.type)

  const score = useMemo(() => {
    const match = matchCareers(result.type, state.preferences).find((m) => m.career.id === career.id)
    return match?.score ?? 70
  }, [result.type, state.preferences, career.id])

  const reason = careerReason(career, result.type, state.preferences, score)

  const context: ChatContext = {
    careerName: career.name,
    careerField: career.field,
    careerOverview: detail.overview,
    careerSkills: detail.skills,
    careerMajors: detail.majors,
    careerSalary: detail.salary.map((s) => `${s.label}: ${s.range}`).join(' | '),
    careerOverseas: detail.overseas,
    mbti: result.type,
    mbtiTitle: personality.title,
    strengths: personality.strengths,
    workStyle: personality.workStyle,
    interests: state.preferences.interests,
    environments: state.preferences.environments,
    priorities: state.preferences.priorities,
    social: state.preferences.social,
    structure: state.preferences.structure,
    income: state.preferences.income,
  }

  return (
    <main className="px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => go('career-results')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#587083] transition hover:text-[#102a43]"
        >
          <ArrowLeft className="size-4" />
          Quay lại danh sách nghề
        </button>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(360px,400px)]">
          {/* Left: content */}
          <div className="min-w-0">
            {/* Hero */}
            <div className="rounded-[2rem] bg-[#102a43] p-8 text-[#f6f5ef] lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#214563] px-3 py-1 text-xs font-semibold text-[#b9d6d1]">
                  {career.field}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-[#ff8066] px-3 py-1 text-xs font-bold text-[#102a43]">
                  <Sparkles className="size-3.5" />
                  Phù hợp {score}%
                </span>
              </div>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                {career.name}
              </h1>
              <p className="mt-5 text-pretty leading-8 text-[#c5d7d7]">{detail.overview}</p>
            </div>

            {/* Reason */}
            <div className="mt-4 rounded-3xl border border-[#f4c3b8] bg-[#fff4ef] p-6">
              <h2 className="flex items-center gap-2 font-semibold text-[#102a43]">
                <Sparkles className="size-5 text-[#e56f59]" />
                Vì sao nghề này có thể hợp với bạn?
              </h2>
              <p className="mt-3 text-sm font-medium leading-6 text-[#a15843]">{reason}</p>
              <p className="mt-3 leading-7 text-[#6e5348]">
                {personalize(career, result.type, state.preferences)}
              </p>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Card icon={<ListChecks className="size-4" />} title="Công việc thường ngày">
                <CheckList items={detail.dailyWork} />
              </Card>
              <Card icon={<Building2 className="size-4" />} title="Môi trường làm việc">
                <p className="text-sm leading-7 text-[#587083]">{detail.workEnvironment}</p>
              </Card>
              <Card icon={<ThumbsUp className="size-4" />} title="Ưu điểm">
                <CheckList items={detail.pros} />
              </Card>
              <Card icon={<AlertTriangle className="size-4" />} title="Thách thức">
                <CheckList items={detail.challenges} />
              </Card>
              <Card icon={<Sparkles className="size-4" />} title="Kỹ năng cần thiết">
                <Chips items={detail.skills} />
              </Card>
              <Card icon={<Wrench className="size-4" />} title="Công cụ / phần mềm thường dùng">
                <Chips items={detail.tools} />
              </Card>
              <Card icon={<GraduationCap className="size-4" />} title="Chuyên ngành đại học liên quan">
                <Chips items={detail.majors} />
              </Card>
              <Card icon={<BookOpen className="size-4" />} title="Môn học THPT nên chú ý">
                <Chips items={detail.subjects} />
              </Card>
            </div>

            {/* Roadmap */}
            <div className="mt-4 rounded-3xl border border-[#dbe4e8] bg-white p-7">
              <h2 className="flex items-center gap-2.5 text-lg font-semibold text-[#102a43]">
                <span className="grid size-9 place-items-center rounded-xl bg-[#e2f0ea] text-[#2e8277]">
                  <Route className="size-4" />
                </span>
                Lộ trình phát triển
              </h2>
              <ol className="mt-6 grid gap-0">
                {detail.roadmap.map((step, i) => (
                  <li key={step.stage} className="relative flex gap-4 pb-7 last:pb-0">
                    {i < detail.roadmap.length - 1 && (
                      <span className="absolute left-[15px] top-8 h-full w-px bg-[#dbe4e8]" aria-hidden />
                    )}
                    <span className="z-10 mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#102a43] font-mono text-xs font-bold text-[#f6f5ef]">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#2e8277]">{step.stage}</div>
                      <div className="mt-1 font-semibold text-[#102a43]">{step.title}</div>
                      <p className="mt-1 text-sm leading-6 text-[#587083]">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Salary + market */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Card icon={<Coins className="size-4" />} title="Mức lương tham khảo (Việt Nam)">
                <div className="grid gap-3">
                  {detail.salary.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-[#f6f5ef] px-4 py-3"
                    >
                      <span className="text-sm text-[#587083]">{s.label}</span>
                      <span className="text-right font-mono text-sm font-semibold text-[#102a43]">{s.range}</span>
                    </div>
                  ))}
                  <p className="text-xs leading-5 text-[#8aa0aa]">
                    Con số chỉ mang tính tham khảo, thay đổi theo năng lực, công ty và khu vực.
                  </p>
                </div>
              </Card>
              <Card icon={<LineChart className="size-4" />} title="Nhu cầu thị trường">
                <p className="text-sm leading-7 text-[#587083]">{detail.marketDemand}</p>
              </Card>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Card icon={<TrendingUp className="size-4" />} title="Hướng phát triển & cơ hội tương lai">
                <CheckList items={detail.futures} />
              </Card>
              <Card icon={<Globe className="size-4" />} title="Cơ hội làm việc ở nước ngoài">
                <p className="text-sm leading-7 text-[#587083]">{detail.overseas}</p>
              </Card>
            </div>
          </div>

          {/* Right: chatbot */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PathfinderChat context={context} />
          </div>
        </div>
      </div>
    </main>
  )
}
