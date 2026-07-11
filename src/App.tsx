import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  GraduationCap,
  Home,
  Layers3,
  Library,
  Medal,
  Pause,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  Trophy,
  X,
  XCircle,
} from 'lucide-react';
import {
  APPROACH_META,
  DOMAIN_META,
  EXAM,
  SCENARIOS,
  TERMS,
  type Approach,
  type Domain,
  type ScenarioQuestion,
  type TermCard,
} from './pmp2026Data';

type Screen = 'dashboard' | 'study' | 'practice' | 'mock' | 'glossary';
type Mastery = 'new' | 'review' | 'known';

interface ProgressState {
  mastery: Record<string, Mastery>;
  correctByDomain: Record<Domain, number>;
  answeredByDomain: Record<Domain, number>;
  bestMockScore: number;
  completedMocks: number;
  medals: Record<string, boolean>;
  lastStudiedAt?: string;
}

interface QuizQuestion {
  id: string;
  sourceId: string;
  type: 'scenario' | 'term';
  domain: Domain;
  approach: Approach;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const STORAGE_KEY = 'pmp-2026-master-progress-v1';
const EMPTY_DOMAIN_NUMBER: Record<Domain, number> = {
  people: 0,
  process: 0,
  business: 0,
};

const DEFAULT_PROGRESS: ProgressState = {
  mastery: {},
  correctByDomain: { ...EMPTY_DOMAIN_NUMBER },
  answeredByDomain: { ...EMPTY_DOMAIN_NUMBER },
  bestMockScore: 0,
  completedMocks: 0,
  medals: {},
};

function safeLoadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      mastery: parsed.mastery ?? {},
      correctByDomain: { ...EMPTY_DOMAIN_NUMBER, ...(parsed.correctByDomain ?? {}) },
      answeredByDomain: { ...EMPTY_DOMAIN_NUMBER, ...(parsed.answeredByDomain ?? {}) },
      medals: parsed.medals ?? {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function shuffle<T>(values: T[]): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function sample<T>(values: T[], count: number): T[] {
  return shuffle(values).slice(0, Math.min(count, values.length));
}

function allocateByWeight(total: number): Record<Domain, number> {
  const domains = Object.keys(EXAM.weights) as Domain[];
  const raw = domains.map((domain) => ({
    domain,
    exact: (total * EXAM.weights[domain]) / 100,
  }));
  const result = raw.reduce(
    (acc, item) => {
      acc[item.domain] = Math.floor(item.exact);
      return acc;
    },
    { ...EMPTY_DOMAIN_NUMBER },
  );
  let remainder = total - Object.values(result).reduce((a, b) => a + b, 0);
  raw
    .sort((a, b) => (b.exact % 1) - (a.exact % 1))
    .forEach((item) => {
      if (remainder > 0) {
        result[item.domain] += 1;
        remainder -= 1;
      }
    });
  return result;
}

function domainClass(domain: Domain): string {
  return {
    people: 'border-amber-200 bg-amber-50 text-amber-800',
    process: 'border-blue-200 bg-blue-50 text-blue-800',
    business: 'border-violet-200 bg-violet-50 text-violet-800',
  }[domain];
}

function domainBarClass(domain: Domain): string {
  return {
    people: 'bg-amber-500',
    process: 'bg-blue-600',
    business: 'bg-violet-600',
  }[domain];
}

function masteryLabel(mastery: Mastery): string {
  return { new: '未学習', review: '要復習', known: '習得済み' }[mastery];
}

function buildTermQuestion(term: TermCard, pool: TermCard[], serial: number): QuizQuestion {
  const distractorPool = pool.filter((item) => item.id !== term.id && item.domain === term.domain);
  const fallback = pool.filter((item) => item.id !== term.id);
  const distractors = sample(distractorPool.length >= 3 ? distractorPool : fallback, 3);
  const optionCards = shuffle([term, ...distractors]);
  return {
    id: `term-${term.id}-${serial}`,
    sourceId: term.id,
    type: 'term',
    domain: term.domain,
    approach: term.approaches[0] ?? 'common',
    question: term.definition,
    options: optionCards.map((item) => item.term),
    answer: optionCards.findIndex((item) => item.id === term.id),
    explanation: term.examTip || `正解は「${term.term}」です。定義と関連用語をセットで確認しましょう。`,
  };
}

function buildScenarioQuestion(scenario: ScenarioQuestion, serial: number): QuizQuestion {
  return {
    id: `scenario-${scenario.id}-${serial}`,
    sourceId: scenario.id,
    type: 'scenario',
    domain: scenario.domain,
    approach: scenario.approach,
    question: scenario.question,
    options: scenario.options,
    answer: scenario.answer,
    explanation: scenario.explanation,
  };
}

function buildMockExam(size: 60 | 180): QuizQuestion[] {
  const quotas = allocateByWeight(size);
  const scenarioTarget = size === 180 ? 45 : 18;
  const scenarioQuotas = allocateByWeight(scenarioTarget);
  const result: QuizQuestion[] = [];
  let serial = 0;

  (Object.keys(quotas) as Domain[]).forEach((domain) => {
    const domainScenarios = sample(
      SCENARIOS.filter((item) => item.domain === domain),
      scenarioQuotas[domain],
    );
    domainScenarios.forEach((item) => {
      serial += 1;
      result.push(buildScenarioQuestion(item, serial));
    });

    const remaining = quotas[domain] - domainScenarios.length;
    const domainTerms = sample(
      TERMS.filter((item) => item.domain === domain),
      remaining,
    );
    domainTerms.forEach((item) => {
      serial += 1;
      result.push(buildTermQuestion(item, TERMS, serial));
    });
  });

  return shuffle(result);
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    : `${minutes}:${String(secs).padStart(2, '0')}`;
}

function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [progress, setProgress] = useState<ProgressState>(() => safeLoadProgress());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateMastery = (id: string, mastery: Mastery) => {
    setProgress((current) => ({
      ...current,
      mastery: { ...current.mastery, [id]: mastery },
      lastStudiedAt: new Date().toISOString(),
    }));
  };

  const recordAnswer = (domain: Domain, correct: boolean) => {
    setProgress((current) => ({
      ...current,
      answeredByDomain: {
        ...current.answeredByDomain,
        [domain]: current.answeredByDomain[domain] + 1,
      },
      correctByDomain: {
        ...current.correctByDomain,
        [domain]: current.correctByDomain[domain] + (correct ? 1 : 0),
      },
      lastStudiedAt: new Date().toISOString(),
    }));
  };

  const resetProgress = () => {
    if (!window.confirm('学習履歴・メダル・模擬試験記録をすべて初期化しますか？')) return;
    setProgress(DEFAULT_PROGRESS);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => setScreen('dashboard')}
            className="flex items-center gap-3 text-left"
          >
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 p-2">
              <GraduationCap size={27} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">PMP 2026 Master</h1>
              <p className="text-xs text-slate-400">2026年7月9日開始・新試験対応</p>
            </div>
          </button>

          <nav className="flex gap-1 overflow-x-auto rounded-xl bg-slate-900 p-1">
            {([
              ['dashboard', Home, 'ホーム'],
              ['study', Layers3, '用語'],
              ['practice', Brain, '演習'],
              ['mock', Trophy, '模試'],
              ['glossary', Library, '用語集'],
            ] as const).map(([key, Icon, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setScreen(key)}
                className={`flex min-w-fit items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition ${
                  screen === key
                    ? 'bg-white text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:py-9">
        {screen === 'dashboard' && (
          <Dashboard progress={progress} setScreen={setScreen} onReset={resetProgress} />
        )}
        {screen === 'study' && (
          <Study progress={progress} updateMastery={updateMastery} />
        )}
        {screen === 'practice' && (
          <Practice recordAnswer={recordAnswer} />
        )}
        {screen === 'mock' && (
          <MockExam
            progress={progress}
            setProgress={setProgress}
          />
        )}
        {screen === 'glossary' && (
          <Glossary progress={progress} updateMastery={updateMastery} />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs leading-relaxed text-slate-500">
          <p className="font-bold text-slate-700">非公式学習ツール</p>
          <p>
            PMI、PMP、PMBOKはProject Management Institute, Inc.の登録商標です。
            本アプリはPMIによる承認・認定・提供を受けたものではありません。
            {EXAM.note}
          </p>
        </div>
      </footer>
    </div>
  );
}

function Dashboard({
  progress,
  setScreen,
  onReset,
}: {
  progress: ProgressState;
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
  onReset: () => void;
}) {
  const known = TERMS.filter((term) => progress.mastery[term.id] === 'known').length;
  const review = TERMS.filter((term) => progress.mastery[term.id] === 'review').length;
  const studied = TERMS.filter((term) => {
    const mastery = progress.mastery[term.id];
    return mastery === 'review' || mastery === 'known';
  }).length;
  const totalAccuracy =
    Object.values(progress.answeredByDomain).reduce((a, b) => a + b, 0) > 0
      ? Math.round(
          (Object.values(progress.correctByDomain).reduce((a, b) => a + b, 0) /
            Object.values(progress.answeredByDomain).reduce((a, b) => a + b, 0)) *
            100,
        )
      : 0;

  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 p-6 text-white shadow-xl md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-sm font-bold text-blue-200">
              <Sparkles size={15} />
              PMP新試験完全対応版
            </div>
            <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
              用語暗記から、
              <br />
              <span className="text-blue-300">状況判断と価値提供</span>へ。
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-slate-300">
              公式ドメイン比率、予測型・アジャイル・ハイブリッド、AI、サステナビリティ、
              変革、コンプライアンスを一体化した学習設計です。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setScreen('study')}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5"
              >
                <BookOpen size={19} />
                学習を始める
              </button>
              <button
                type="button"
                onClick={() => setScreen('practice')}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-black text-white transition hover:bg-white/20"
              >
                <Brain size={19} />
                シナリオ演習
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              <Stat label="開始日" value="2026/7/9" />
              <Stat label="試験時間" value="240分" />
              <Stat label="問題数" value="180問" />
              <Stat label="登録用語" value={`${TERMS.length}語`} />
            </div>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="mb-3 text-sm font-bold text-slate-300">公式ドメイン比率</p>
              {(Object.keys(DOMAIN_META) as Domain[]).map((domain) => (
                <div key={domain} className="mb-3">
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{DOMAIN_META[domain].label}</span>
                    <span className="font-black">{DOMAIN_META[domain].weight}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full ${domainBarClass(domain)}`}
                      style={{ width: `${DOMAIN_META[domain].weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard icon={BookOpen} label="学習済み" value={`${studied}/${TERMS.length}`} />
        <MetricCard icon={CheckCircle2} label="習得済み" value={`${known}語`} />
        <MetricCard icon={RotateCcw} label="要復習" value={`${review}語`} />
        <MetricCard icon={Target} label="演習正答率" value={`${totalAccuracy}%`} />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black">ドメイン別の習熟状況</h3>
              <p className="text-sm text-slate-500">学習語数と演習正答率を分けて表示</p>
            </div>
            <BarChart3 className="text-blue-600" />
          </div>
          <div className="space-y-5">
            {(Object.keys(DOMAIN_META) as Domain[]).map((domain) => {
              const domainTerms = TERMS.filter((term) => term.domain === domain);
              const domainKnown = domainTerms.filter(
                (term) => progress.mastery[term.id] === 'known',
              ).length;
              const answered = progress.answeredByDomain[domain];
              const accuracy = answered
                ? Math.round((progress.correctByDomain[domain] / answered) * 100)
                : 0;
              return (
                <div key={domain}>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-black">{DOMAIN_META[domain].label}</span>
                      <span className="ml-2 text-sm text-slate-500">
                        {DOMAIN_META[domain].ja}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-600">
                      習得 {domainKnown}/{domainTerms.length}・演習 {accuracy}%
                    </div>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full ${domainBarClass(domain)}`}
                      style={{ width: `${(domainKnown / domainTerms.length) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Medal className="text-amber-500" />
            <div>
              <h3 className="text-xl font-black">模擬試験記録</h3>
              <p className="text-sm text-slate-500">80%はアプリ内マスタリー基準</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-slate-500">最高得点</p>
              <p className="mt-1 text-3xl font-black text-blue-700">
                {progress.bestMockScore}%
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-slate-500">完了回数</p>
              <p className="mt-1 text-3xl font-black text-violet-700">
                {progress.completedMocks}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setScreen('mock')}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-black text-white hover:bg-slate-800"
          >
            <Trophy size={18} />
            模擬試験へ
          </button>
          <button
            type="button"
            onClick={onReset}
            className="mt-3 w-full rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50"
          >
            学習履歴を初期化
          </button>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-black/15 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Icon size={22} className="mb-3 text-blue-600" />
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function Study({
  progress,
  updateMastery,
}: {
  progress: ProgressState;
  updateMastery: (id: string, mastery: Mastery) => void;
}) {
  const [domain, setDomain] = useState<Domain | 'all'>('all');
  const [approach, setApproach] = useState<Approach | 'all'>('all');
  const [masteryFilter, setMasteryFilter] = useState<Mastery | 'all'>('all');
  const [priority, setPriority] = useState<'all' | 'core'>('core');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const filtered = useMemo(
    () =>
      TERMS.filter((term) => {
        const currentMastery = progress.mastery[term.id] ?? 'new';
        return (
          (domain === 'all' || term.domain === domain) &&
          (approach === 'all' || term.approaches.includes(approach)) &&
          (masteryFilter === 'all' || currentMastery === masteryFilter) &&
          (priority === 'all' || term.priority === 'core')
        );
      }),
    [domain, approach, masteryFilter, priority, progress.mastery],
  );

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
  }, [domain, approach, masteryFilter, priority]);

  useEffect(() => {
    if (index > filtered.length - 1) {
      setIndex(Math.max(filtered.length - 1, 0));
      setRevealed(false);
    }
  }, [filtered.length, index]);

  const current = filtered[index];
  const move = (delta: number) => {
    setRevealed(false);
    setIndex((value) => Math.max(0, Math.min(filtered.length - 1, value + delta)));
  };

  const classify = (mastery: Mastery) => {
    if (!current) return;
    updateMastery(current.id, mastery);
    const nextLength =
      masteryFilter === 'all' || masteryFilter === mastery ? filtered.length : filtered.length - 1;
    if (nextLength <= 0) {
      setIndex(0);
    } else {
      setIndex((value) => Math.min(value, nextLength - 1));
    }
    setRevealed(false);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeading
        icon={Layers3}
        title="用語カード"
        description="ドメインと開発アプローチを分離し、新試験の横断的な理解をつくります。"
      />

      <div className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <FilterSelect
          label="ドメイン"
          value={domain}
          onChange={(value) => setDomain(value as Domain | 'all')}
          options={[
            ['all', 'すべて'],
            ['people', 'People'],
            ['process', 'Process'],
            ['business', 'Business Environment'],
          ]}
        />
        <FilterSelect
          label="アプローチ"
          value={approach}
          onChange={(value) => setApproach(value as Approach | 'all')}
          options={[
            ['all', 'すべて'],
            ['common', '共通'],
            ['predictive', '予測型'],
            ['agile', 'アジャイル'],
            ['hybrid', 'ハイブリッド'],
          ]}
        />
        <FilterSelect
          label="習熟度"
          value={masteryFilter}
          onChange={(value) => setMasteryFilter(value as Mastery | 'all')}
          options={[
            ['all', 'すべて'],
            ['new', '未学習'],
            ['review', '要復習'],
            ['known', '習得済み'],
          ]}
        />
        <FilterSelect
          label="重要度"
          value={priority}
          onChange={(value) => setPriority(value as 'all' | 'core')}
          options={[
            ['core', 'コアのみ'],
            ['all', '全用語'],
          ]}
        />
      </div>

      {!current ? (
        <EmptyState message="条件に合うカードがありません。" />
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between text-sm font-bold text-slate-500">
            <span>
              {index + 1} / {filtered.length}
            </span>
            <span>{Math.round(((index + 1) / filtered.length) * 100)}%</span>
          </div>
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${((index + 1) / filtered.length) * 100}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => setRevealed((value) => !value)}
            className="min-h-[390px] w-full rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-xl transition hover:-translate-y-0.5 md:p-10"
          >
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <Badge>{DOMAIN_META[current.domain].label}</Badge>
              {current.approaches.map((item) => (
                <Badge key={item}>{APPROACH_META[item].label}</Badge>
              ))}
              <Badge>{current.priority === 'core' ? 'コア' : current.priority === 'important' ? '重要' : '補足'}</Badge>
              <span className="ml-auto text-xs font-bold text-slate-400">
                {masteryLabel(progress.mastery[current.id] ?? 'new')}
              </span>
            </div>

            {!revealed ? (
              <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-black leading-tight md:text-4xl">{current.term}</h2>
                <p className="mt-8 flex items-center gap-2 text-sm text-slate-400">
                  <RotateCcw size={16} />
                  タップして定義を表示
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-blue-600">定義</p>
                <p className="mt-3 text-lg font-bold leading-relaxed md:text-xl">
                  {current.definition}
                </p>
                {current.examTip && (
                  <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-black text-amber-800">
                      <Sparkles size={16} />
                      試験ポイント
                    </p>
                    <p className="mt-2 leading-relaxed text-amber-950">{current.examTip}</p>
                  </div>
                )}
              </div>
            )}
          </button>

          {revealed && (
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
              <button
                type="button"
                onClick={() => classify('review')}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-300 bg-white px-4 py-3 font-black text-amber-700 hover:bg-amber-50"
              >
                <X size={19} />
                要復習
              </button>
              <button
                type="button"
                onClick={() => classify('known')}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-black text-white hover:bg-emerald-700"
              >
                <Check size={19} />
                習得済み
              </button>
              <button
                type="button"
                onClick={() => classify('new')}
                className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-600 hover:bg-slate-50 md:col-span-1"
              >
                <Circle size={18} />
                未学習へ戻す
              </button>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => move(-1)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 font-bold text-slate-600 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
              前へ
            </button>
            <button
              type="button"
              disabled={index >= filtered.length - 1}
              onClick={() => move(1)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 font-bold text-slate-600 disabled:opacity-30"
            >
              次へ
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Practice({
  recordAnswer,
}: {
  recordAnswer: (domain: Domain, correct: boolean) => void;
}) {
  const [domain, setDomain] = useState<Domain | 'all'>('all');
  const [limit, setLimit] = useState<10 | 20>(10);
  const [questions, setQuestions] = useState<ScenarioQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const availableQuestions = SCENARIOS.filter(
    (item) => domain === 'all' || item.domain === domain,
  ).length;
  const questionCountOptions = ([10, 20] as const).filter(
    (count) => count <= availableQuestions,
  );
  const selectedLimit = questionCountOptions.includes(limit) ? limit : 10;

  const start = () => {
    const pool = SCENARIOS.filter((item) => domain === 'all' || item.domain === domain);
    setQuestions(sample(pool, selectedLimit));
    setIndex(0);
    setSelected(null);
    setAnswers({});
    setFinished(false);
  };

  const answer = (option: number) => {
    if (selected !== null) return;
    const question = questions[index];
    setSelected(option);
    setAnswers((current) => ({ ...current, [question.id]: option }));
    recordAnswer(question.domain, option === question.answer);
  };

  const next = () => {
    if (index >= questions.length - 1) {
      setFinished(true);
    } else {
      setIndex((value) => value + 1);
      setSelected(null);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeading
          icon={Brain}
          title="シナリオ演習"
          description="「最初に何をするか」「最も適切な行動は何か」を解説付きで練習します。"
        />
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-9">
          <div className="grid gap-4 md:grid-cols-2">
            <FilterSelect
              label="ドメイン"
              value={domain}
              onChange={(value) => setDomain(value as Domain | 'all')}
              options={[
                ['all', '全ドメイン'],
                ['people', 'People'],
                ['process', 'Process'],
                ['business', 'Business Environment'],
              ]}
            />
            <FilterSelect
              label="問題数"
              value={String(selectedLimit)}
              onChange={(value) => setLimit(Number(value) as 10 | 20)}
              options={questionCountOptions.map((count) => [String(count), `${count}問`])}
            />
          </div>
          <div className="mt-7 rounded-2xl bg-slate-50 p-5">
            <p className="font-black">収録内容</p>
            <p className="mt-2 leading-relaxed text-slate-600">
              チーム、対立、EVM、変更管理、スクラム、ハイブリッド、AI、
              コンプライアンス、価値、変革、サステナビリティなど全{SCENARIOS.length}問。
            </p>
          </div>
          <button
            type="button"
            onClick={start}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-4 font-black text-white hover:bg-blue-800"
          >
            <Play size={20} />
            演習を開始
          </button>
        </div>
      </div>
    );
  }

  const correctCount = questions.filter(
    (question) => answers[question.id] === question.answer,
  ).length;

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <ResultPanel
        title={score >= 80 ? 'マスタリー達成！' : '復習ポイントを確認しましょう'}
        score={score}
        correct={correctCount}
        total={questions.length}
        onRetry={() => setQuestions([])}
      >
        <div className="mt-6 space-y-4 text-left">
          {questions.map((question, number) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.answer;
            return (
              <div
                key={question.id}
                className={`rounded-xl border p-4 ${
                  isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <p className="font-black">
                  Q{number + 1}. {question.question}
                </p>
                <p className="mt-2 text-sm">
                  正解：{question.options[question.answer]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {question.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </ResultPanel>
    );
  }

  const current = questions[index];
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between text-sm font-black text-slate-500">
        <span>
          Q {index + 1} / {questions.length}
        </span>
        <span>正解 {correctCount}</span>
      </div>
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-blue-600"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-9">
        <div className="mb-5 flex flex-wrap gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-black ${domainClass(current.domain)}`}>
            {DOMAIN_META[current.domain].label}
          </span>
          <Badge>{APPROACH_META[current.approach].label}</Badge>
          <Badge>{current.difficulty === 'hard' ? '難' : current.difficulty === 'medium' ? '中' : '易'}</Badge>
        </div>
        <h2 className="text-xl font-black leading-relaxed md:text-2xl">{current.question}</h2>

        <div className="mt-7 space-y-3">
          {current.options.map((option, optionIndex) => {
            const isCorrect = optionIndex === current.answer;
            const isSelected = optionIndex === selected;
            let className =
              'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50';
            if (selected !== null) {
              if (isCorrect) className = 'border-emerald-500 bg-emerald-50 text-emerald-900';
              else if (isSelected) className = 'border-red-400 bg-red-50 text-red-900';
              else className = 'border-slate-200 bg-slate-50 text-slate-400';
            }
            return (
              <button
                key={option}
                type="button"
                disabled={selected !== null}
                onClick={() => answer(optionIndex)}
                className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left font-bold transition ${className}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div
            className={`mt-6 rounded-2xl border p-5 ${
              selected === current.answer
                ? 'border-emerald-200 bg-emerald-50'
                : 'border-amber-200 bg-amber-50'
            }`}
          >
            <p className="flex items-center gap-2 font-black">
              {selected === current.answer ? (
                <CheckCircle2 className="text-emerald-600" />
              ) : (
                <AlertTriangle className="text-amber-600" />
              )}
              {selected === current.answer ? '正解です' : '正解と考え方'}
            </p>
            <p className="mt-3 leading-relaxed">{current.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <button
            type="button"
            onClick={next}
            className="mt-6 ml-auto flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-black text-white hover:bg-slate-800"
          >
            {index === questions.length - 1 ? '結果を見る' : '次の問題'}
            <ChevronRight size={19} />
          </button>
        )}
      </div>
    </div>
  );
}

function MockExam({
  progress,
  setProgress,
}: {
  progress: ProgressState;
  setProgress: React.Dispatch<React.SetStateAction<ProgressState>>;
}) {
  const [size, setSize] = useState<60 | 180>(60);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [graded, setGraded] = useState(false);

  const gradeExam = useCallback(
    (confirmFirst: boolean) => {
      if (confirmFirst && !window.confirm('模擬試験を終了して採点しますか？')) return;
      if (graded || questions.length === 0) return;

      const correct = questions.filter(
        (question) => answers[question.id] === question.answer,
      ).length;
      const score = Math.round((correct / questions.length) * 100);
      const answeredDelta = { ...EMPTY_DOMAIN_NUMBER };
      const correctDelta = { ...EMPTY_DOMAIN_NUMBER };

      questions.forEach((question) => {
        const userAnswer = answers[question.id];
        if (userAnswer === undefined) return;
        answeredDelta[question.domain] += 1;
        if (userAnswer === question.answer) correctDelta[question.domain] += 1;
      });

      setProgress((current) => ({
        ...current,
        answeredByDomain: {
          people: current.answeredByDomain.people + answeredDelta.people,
          process: current.answeredByDomain.process + answeredDelta.process,
          business: current.answeredByDomain.business + answeredDelta.business,
        },
        correctByDomain: {
          people: current.correctByDomain.people + correctDelta.people,
          process: current.correctByDomain.process + correctDelta.process,
          business: current.correctByDomain.business + correctDelta.business,
        },
        bestMockScore: Math.max(current.bestMockScore, score),
        completedMocks: current.completedMocks + 1,
        medals: {
          ...current.medals,
          ...(score >= 80 ? { [`mock-${size}`]: true } : {}),
        },
        lastStudiedAt: new Date().toISOString(),
      }));
      setGraded(true);
      setRunning(false);
      setFinished(true);
    },
    [answers, graded, questions, setProgress, size],
  );

  useEffect(() => {
    if (!running || finished || questions.length === 0) return undefined;
    const timer = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, finished, questions.length]);

  useEffect(() => {
    if (seconds === 0 && running && questions.length > 0 && !finished) {
      gradeExam(false);
    }
  }, [seconds, running, questions.length, finished, gradeExam]);

  const start = () => {
    const nextQuestions = buildMockExam(size);
    setQuestions(nextQuestions);
    setIndex(0);
    setAnswers({});
    setFlagged({});
    setSeconds(size === 180 ? EXAM.minutes * 60 : 80 * 60);
    setRunning(true);
    setFinished(false);
    setReviewMode(false);
    setGraded(false);
  };

  const finish = () => gradeExam(true);

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-4xl">
        <PageHeading
          icon={Trophy}
          title="新試験準拠・模擬試験"
          description="公式比率でPeople 33%、Process 41%、Business Environment 26%を出題します。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {([60, 180] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={`rounded-3xl border-2 bg-white p-6 text-left shadow-sm transition ${
                size === option
                  ? 'border-blue-600 ring-4 ring-blue-100'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-3xl font-black">{option}問</p>
                {progress.medals[`mock-${option}`] && (
                  <Medal className="text-amber-500" size={30} />
                )}
              </div>
              <p className="mt-2 text-slate-600">
                {option === 180 ? '本試験相当・240分' : '短縮版・80分'}
              </p>
              <div className="mt-5 space-y-2 text-sm font-bold text-slate-500">
                {Object.entries(allocateByWeight(option)).map(([domain, count]) => (
                  <div key={domain} className="flex justify-between">
                    <span>{DOMAIN_META[domain as Domain].label}</span>
                    <span>{count}問</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
          <p className="font-black">採点について</p>
          <p className="mt-1">
            80%は本アプリ内のマスタリー基準です。PMIの公式合格点を示すものではありません。
            本番では採点対象外問題を含む場合がありますが、本アプリでは全問採点します。
          </p>
        </div>

        <button
          type="button"
          onClick={start}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-4 font-black text-white hover:bg-blue-800"
        >
          <Clock3 size={20} />
          {size}問模試を開始
        </button>
      </div>
    );
  }

  const correct = questions.filter((question) => answers[question.id] === question.answer).length;
  const answered = Object.keys(answers).length;
  const score = Math.round((correct / questions.length) * 100);

  if (finished) {
    const breakdown = (Object.keys(DOMAIN_META) as Domain[]).map((domain) => {
      const domainQuestions = questions.filter((question) => question.domain === domain);
      const domainCorrect = domainQuestions.filter(
        (question) => answers[question.id] === question.answer,
      ).length;
      return {
        domain,
        correct: domainCorrect,
        total: domainQuestions.length,
        score: Math.round((domainCorrect / domainQuestions.length) * 100),
      };
    });

    return (
      <div className="mx-auto max-w-5xl">
        <ResultPanel
          title={score >= 80 ? 'マスタリー基準達成！' : '弱点を見つけました'}
          score={score}
          correct={correct}
          total={questions.length}
          onRetry={() => setQuestions([])}
        >
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {breakdown.map((item) => (
              <div key={item.domain} className="rounded-xl border border-slate-200 bg-white p-4 text-left">
                <p className="font-black">{DOMAIN_META[item.domain].label}</p>
                <p className="mt-2 text-3xl font-black">{item.score}%</p>
                <p className="text-sm text-slate-500">
                  {item.correct}/{item.total}問
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setReviewMode((value) => !value)}
            className="mt-6 rounded-xl border border-slate-300 px-5 py-3 font-black text-slate-700 hover:bg-slate-50"
          >
            {reviewMode ? '復習一覧を閉じる' : '全問の解説を確認'}
          </button>

          {reviewMode && (
            <div className="mt-6 space-y-4 text-left">
              {questions.map((question, number) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.answer;
                return (
                  <div
                    key={question.id}
                    className={`rounded-xl border p-4 ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="mb-2 flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                      ) : (
                        <XCircle className="mt-0.5 shrink-0 text-red-600" size={18} />
                      )}
                      <p className="font-black">
                        Q{number + 1}. {question.question}
                      </p>
                    </div>
                    <p className="text-sm">
                      あなたの回答：
                      {userAnswer === undefined ? '未回答' : question.options[userAnswer]}
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      正解：{question.options[question.answer]}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {question.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </ResultPanel>
      </div>
    );
  }

  const current = questions[index];
  const selected = answers[current.id];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="font-black">
            Q {index + 1}/{questions.length}
          </span>
          <span className="text-sm font-bold text-slate-500">
            回答済み {answered}
          </span>
          <span className="text-sm font-bold text-amber-600">
            フラグ {Object.values(flagged).filter(Boolean).length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((value) => !value)}
            className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
            aria-label={running ? '一時停止' : '再開'}
          >
            {running ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <span className={`font-mono text-xl font-black ${seconds < 600 ? 'text-red-600' : ''}`}>
            {formatTime(seconds)}
          </span>
          <button
            type="button"
            onClick={finish}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white hover:bg-red-700"
          >
            採点
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_270px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-9">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className={`rounded-full border px-3 py-1 text-xs font-black ${domainClass(current.domain)}`}>
              {DOMAIN_META[current.domain].label}
            </span>
            <Badge>{APPROACH_META[current.approach].label}</Badge>
            <Badge>{current.type === 'scenario' ? '状況判断' : '用語確認'}</Badge>
          </div>
          <h2 className="text-xl font-black leading-relaxed md:text-2xl">
            {current.type === 'term' && (
              <span className="mb-2 block text-xs uppercase tracking-wider text-blue-600">
                この定義に該当する用語は？
              </span>
            )}
            {current.question}
          </h2>
          <div className="mt-7 space-y-3">
            {current.options.map((option, optionIndex) => (
              <button
                key={`${current.id}-${optionIndex}`}
                type="button"
                onClick={() =>
                  setAnswers((value) => ({ ...value, [current.id]: optionIndex }))
                }
                className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left font-bold transition ${
                  selected === optionIndex
                    ? 'border-blue-600 bg-blue-50 text-blue-950'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm ${
                    selected === optionIndex
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                {option}
              </button>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                setFlagged((value) => ({ ...value, [current.id]: !value[current.id] }))
              }
              className={`rounded-xl border px-4 py-2 text-sm font-black ${
                flagged[current.id]
                  ? 'border-amber-400 bg-amber-50 text-amber-700'
                  : 'border-slate-300 text-slate-600'
              }`}
            >
              {flagged[current.id] ? '★ 後で見直す' : '☆ フラグ'}
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => setIndex((value) => Math.max(0, value - 1))}
                className="rounded-xl border border-slate-300 px-4 py-2 font-black disabled:opacity-30"
              >
                前へ
              </button>
              <button
                type="button"
                disabled={index === questions.length - 1}
                onClick={() =>
                  setIndex((value) => Math.min(questions.length - 1, value + 1))
                }
                className="rounded-xl bg-slate-900 px-4 py-2 font-black text-white disabled:opacity-30"
              >
                次へ
              </button>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 font-black">問題一覧</p>
          <div className="grid max-h-[650px] grid-cols-5 gap-2 overflow-y-auto pr-1">
            {questions.map((question, number) => {
              const isAnswered = answers[question.id] !== undefined;
              const isFlagged = flagged[question.id];
              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setIndex(number)}
                  className={`relative aspect-square rounded-lg text-xs font-black ${
                    number === index
                      ? 'bg-blue-700 text-white'
                      : isAnswered
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {number + 1}
                  {isFlagged && (
                    <span className="absolute -right-0.5 -top-1 text-[10px] text-amber-500">★</span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Glossary({
  progress,
  updateMastery,
}: {
  progress: ProgressState;
  updateMastery: (id: string, mastery: Mastery) => void;
}) {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState<Domain | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return TERMS.filter((term) => {
      const haystack = `${term.term} ${term.definition} ${term.tags.join(' ')}`.toLowerCase();
      return (
        (domain === 'all' || term.domain === domain) &&
        (!normalized || haystack.includes(normalized))
      );
    });
  }, [query, domain]);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeading
        icon={Library}
        title="検索用語集"
        description={`${TERMS.length}語を、用語・定義・タグから検索できます。`}
      />

      <div className="sticky top-[86px] z-20 mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_250px]">
          <label className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例：AI、リスク、ステークホルダー、EVM"
              className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value as Domain | 'all')}
            className="rounded-xl border border-slate-300 px-4 py-3 font-bold outline-none focus:border-blue-500"
          >
            <option value="all">全ドメイン</option>
            <option value="people">People</option>
            <option value="process">Process</option>
            <option value="business">Business Environment</option>
          </select>
        </div>
        <p className="mt-3 text-sm font-bold text-slate-500">{results.length}件</p>
      </div>

      <div className="space-y-3">
        {results.map((term) => {
          const mastery = progress.mastery[term.id] ?? 'new';
          const isExpanded = expanded === term.id;
          return (
            <article
              key={term.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : term.id)}
                className="flex w-full items-center gap-3 p-4 text-left md:p-5"
              >
                <span className={`rounded-full border px-2.5 py-1 text-xs font-black ${domainClass(term.domain)}`}>
                  {DOMAIN_META[term.domain].label}
                </span>
                <span className="flex-1 font-black">{term.term}</span>
                <span className="hidden text-xs font-bold text-slate-400 md:block">
                  {masteryLabel(mastery)}
                </span>
                <ChevronRight
                  size={19}
                  className={`text-slate-400 transition ${isExpanded ? 'rotate-90' : ''}`}
                />
              </button>
              {isExpanded && (
                <div className="border-t border-slate-100 px-5 py-5">
                  <p className="leading-relaxed">{term.definition}</p>
                  {term.examTip && (
                    <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">
                      <strong>試験ポイント：</strong> {term.examTip}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {term.approaches.map((item) => (
                      <Badge key={item}>{APPROACH_META[item].label}</Badge>
                    ))}
                    {term.tags.map((tag) => (
                      <Badge key={tag}>#{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateMastery(term.id, 'review')}
                      className="rounded-lg border border-amber-300 px-3 py-2 text-sm font-black text-amber-700 hover:bg-amber-50"
                    >
                      要復習
                    </button>
                    <button
                      type="button"
                      onClick={() => updateMastery(term.id, 'known')}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-black text-white hover:bg-emerald-700"
                    >
                      習得済み
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PageHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
      </div>
      <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black text-slate-600">
      {children}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <Search className="mx-auto text-slate-300" size={48} />
      <p className="mt-4 font-black text-slate-700">{message}</p>
    </div>
  );
}

function ResultPanel({
  title,
  score,
  correct,
  total,
  onRetry,
  children,
}: {
  title: string;
  score: number;
  correct: number;
  total: number;
  onRetry: () => void;
  children?: React.ReactNode;
}) {
  const passed = score >= 80;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl md:p-9">
      {passed ? (
        <Medal className="mx-auto text-amber-500" size={80} />
      ) : (
        <Target className="mx-auto text-slate-400" size={70} />
      )}
      <h2 className="mt-4 text-3xl font-black">{title}</h2>
      <p className="mt-2 text-slate-500">
        本アプリ内マスタリー基準：80%
      </p>
      <p className={`mt-6 text-6xl font-black ${passed ? 'text-emerald-600' : 'text-blue-700'}`}>
        {score}%
      </p>
      <p className="mt-2 font-bold text-slate-500">
        {correct}/{total}問正解
      </p>
      {children}
      <button
        type="button"
        onClick={onRetry}
        className="mt-7 rounded-xl bg-slate-900 px-6 py-3 font-black text-white hover:bg-slate-800"
      >
        メニューへ戻る
      </button>
    </div>
  );
}

export default App;
