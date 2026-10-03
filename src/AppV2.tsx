import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3, Brain, BookOpen, CheckCircle2, ChevronLeft, ChevronRight,
  GraduationCap, Home, Library, RotateCcw, Search, Sparkles, Target, Trophy,
  XCircle
} from 'lucide-react';
import {
  APPROACH_META, DOMAIN_META, SCENARIOS, TERMS,
  type Approach, type Domain, type ScenarioQuestion, type TermCard
} from './pmp2026Data';

type Screen = 'home' | 'learn' | 'practice' | 'mock' | 'glossary';
type Skill = 'concept' | 'distinction' | 'application' | 'decision' | 'retention';
type SkillScores = Partial<Record<Skill, number>>;

interface Progress {
  skills: Record<string, SkillScores>;
  attempts: Record<string, number>;
  correct: Record<string, number>;
  lastSeen: Record<string, string>;
  scenarioAttempts: number;
  scenarioCorrect: number;
  bestScenarioMock: number;
}

interface LearningProfile {
  plain: string;
  when: string[];
  contrast?: { title: string; body: string };
  rule: string;
  example: string;
  antiPattern?: string;
}

const STORAGE_KEY = 'pmp-2026-applied-learning-v2';
const EMPTY: Progress = {
  skills: {}, attempts: {}, correct: {}, lastSeen: {},
  scenarioAttempts: 0, scenarioCorrect: 0, bestScenarioMock: 0,
};

const SKILL_LABEL: Record<Skill, string> = {
  concept: '概念理解',
  distinction: '使い分け',
  application: '状況への適用',
  decision: 'FIRST/NEXT/BEST判断',
  retention: '定着',
};

const CURATED: Array<[string, LearningProfile]> = [
  ['リスク・レジスター', {
    plain: 'まだ起きていない不確実な出来事を、分析・対応・担当者まで含めて管理する台帳。',
    when: ['新しいリスクを特定した', '発生確率や影響度を評価した', '対応策やリスクオーナーを決めた'],
    contrast: { title: 'Issue Logとの違い', body: 'Riskは未発生。Issueはすでに発生している問題。' },
    rule: '「起こるかもしれない」ならRisk。「もう起きた」ならIssue。',
    example: '主要ベンダーの納品が2週間遅れる可能性が30%ある。',
    antiPattern: '発生済みの問題を、Risk Registerだけで追い続ける。',
  }],
  ['課題ログ', {
    plain: 'すでに発生した問題を、担当者・対応・期限とともに追跡する記録。',
    when: ['問題が現実に発生した', '解決責任者を決める', '期限まで対応状況を追跡する'],
    contrast: { title: 'Risk Registerとの違い', body: 'Issueは発生済み。Riskはまだ発生していない不確実性。' },
    rule: '「今まさに起きている」ならIssue Logへ。',
    example: '主要ベンダーの納品がすでに3日遅れている。',
  }],
  ['CCB', {
    plain: '変更要求を正式に評価し、承認・却下・延期などを判断する仕組み。',
    when: ['ベースラインへの変更要求が出た', '変更の影響分析が終わった', '承認権限に基づく判断が必要'],
    contrast: { title: 'PMの独断との違い', body: 'PMは影響を分析するが、承認権限を超える変更を勝手に実施しない。' },
    rule: '小さな変更でも、定められた変更管理プロセスに従う。',
    example: '顧客から「5分で直せるから機能を1つ追加して」と頼まれた。',
    antiPattern: '工数が小さいことを理由に、正式な変更管理を飛ばす。',
  }],
  ['スコープ・クリープ', {
    plain: '正式な変更管理なしに、要求や作業範囲がじわじわ増えること。',
    when: ['承認されていない追加機能が入り始めた', '「ついでに」が繰り返される', 'コスト・納期調整なしで範囲だけ増える'],
    contrast: { title: '承認済み変更との違い', body: '正式に評価・承認された変更はScope Creepではない。' },
    rule: '価値がありそうでも、承認されていない追加作業は勝手に行わない。',
    example: 'チームが「喜ばれるはず」と顧客未承認の便利機能を追加しようとしている。',
  }],
  ['コンティンジェンシー予備', {
    plain: '特定済みリスクに備えるため、計画内に確保する予備。',
    when: ['既知のリスクへの対応費を見込む', 'リスク分析の結果を予算や日程へ反映する'],
    contrast: { title: 'Management Reserveとの違い', body: 'Contingencyは特定済みリスク向け。Management Reserveは未特定の不確実性向け。' },
    rule: 'Known-unknownsにはContingency。',
    example: '特定済みの為替変動リスクに備えて予算を確保する。',
  }],
  ['マネジメント予備', {
    plain: '予見できなかった作業や未特定の不確実性に備える、ベースライン外の予備。',
    when: ['未特定の事象が顕在化した', '組織のガバナンスに従って予備を使用する'],
    contrast: { title: 'Contingency Reserveとの違い', body: 'Management Reserveは未知の不確実性向けで、コスト・ベースライン外。' },
    rule: 'Unknown-unknownsにはManagement Reserve。',
    example: '計画時に想定していなかった規制変更への対応費が必要になった。',
  }],
  ['クラッシング', {
    plain: '追加コストを投入して、クリティカル・パス上の期間を短縮する技法。',
    when: ['納期短縮が必要', '追加要員や残業で期間を縮められる', 'コスト増とのトレードオフを評価する'],
    contrast: { title: 'Fast Trackingとの違い', body: 'Crashingは資源・コストを追加。Fast Trackingは順次作業を並行化してリスクを増やす。' },
    rule: 'お金・資源を足して短縮するならCrashing。',
    example: '納期を守るため、クリティカル作業へ追加要員を投入する。',
  }],
  ['ファスト・トラッキング', {
    plain: '本来順番に行う作業を一部並行化して、期間を短縮する技法。',
    when: ['依存作業を重ねて進められる', '納期短縮が必要', '手戻りリスクを許容できる'],
    contrast: { title: 'Crashingとの違い', body: 'Fast Trackingは並行化。Crashingは追加資源・追加コスト。' },
    rule: '順番を重ねて短縮するならFast Tracking。手戻りリスクに注意。',
    example: '設計完了前に、一部の実装を先行して開始する。',
  }],
  ['品質保証', {
    plain: '品質を作り込むプロセスややり方が適切かを確認・改善する活動。',
    when: ['プロセス監査をする', '品質活動そのものを改善する', '再発防止の仕組みを整える'],
    contrast: { title: 'Quality Controlとの違い', body: 'QAはプロセス寄り。QCは成果物や結果を検査する。' },
    rule: '「作り方」を良くするのがQA、「できたもの」を確かめるのがQC。',
    example: '同じ欠陥が繰り返されるため、開発プロセス自体を監査・改善する。',
  }],
  ['品質管理', {
    plain: '成果物や結果を検査し、品質要求を満たしているか確認する活動。',
    when: ['成果物を検査する', '欠陥を測定・記録する', '受け入れ前に品質を検証する'],
    contrast: { title: 'Quality Assuranceとの違い', body: 'QCは成果物・結果寄り。QAはプロセス・仕組み寄り。' },
    rule: '成果物そのものを検査するならQC。',
    example: '納品前のソフトウェアをテストし、欠陥件数を記録する。',
  }],
  ['受け入れ基準', {
    plain: '特定の要求やバックログ項目を受け入れ可能と判断するための具体条件。',
    when: ['要求の完成条件を明確にする', '顧客と期待を合わせる', 'テスト可能な条件に落とす'],
    contrast: { title: 'Definition of Doneとの違い', body: 'Acceptance Criteriaは項目ごとの条件。DoDはインクリメント全体に共通する品質基準。' },
    rule: '「この項目がOKか」はAcceptance Criteria。',
    example: 'ユーザーストーリーごとに、満たすべき具体条件を定義する。',
  }],
  ['完了の定義', {
    plain: 'インクリメントが組織・チームの品質基準を満たしたとみなす共通基準。',
    when: ['Doneの意味をチームで揃える', '品質の最低ラインを守る', 'インクリメント完成を判断する'],
    contrast: { title: 'Acceptance Criteriaとの違い', body: 'DoDは共通の品質基準。Acceptance Criteriaは個別項目の受け入れ条件。' },
    rule: '「チーム全体で共通のDone」はDefinition of Done。',
    example: '全ストーリーに共通して、レビュー・テスト・文書化済みをDone条件とする。',
  }],
  ['プロダクト・バックログ', {
    plain: 'プロダクト改善に必要な作業を、価値や状況に応じて順序付ける動的なリスト。',
    when: ['新要求を取り込む', '価値やリスクで順序を見直す', '今後の作業候補を一元管理する'],
    contrast: { title: 'Sprint Backlogとの違い', body: 'Product Backlogはプロダクト全体。Sprint Backlogは現在のSprintで扱う選択済み作業。' },
    rule: '新要求はまずProduct Backlogで可視化し、順序付ける。',
    example: 'スプリント中に重要な新要求が来たが、スプリント・ゴールを壊すほど緊急ではない。',
  }],
  ['スプリント・バックログ', {
    plain: 'スプリント・ゴール達成のために選んだ項目と、その実現計画。',
    when: ['現在のSprintで何をするか決める', '開発者が日々計画を適応する'],
    contrast: { title: 'Product Backlogとの違い', body: 'Sprint Backlogは現在のSprintの計画。Product Backlogはプロダクト全体の作業候補。' },
    rule: '「今スプリントでどう達成するか」はSprint Backlog。',
    example: '開発者がDaily Scrumで次の24時間の作業計画を調整する。',
  }],
  ['ステークホルダー', {
    plain: 'プロジェクトへ影響を与える、または影響を受ける人・集団・組織。',
    when: ['要求を把握する', '影響力や関心を分析する', '関与方法を調整する'],
    contrast: { title: '単なる報告先ではない', body: '重要なのは一方向の報告ではなく、期待・影響・関与を継続的に管理すること。' },
    rule: 'まず相手のニーズ・影響力・期待を理解してから関与方法を選ぶ。',
    example: '影響力の高い利用部門責任者が、プロジェクトへ強く反対している。',
  }],
  ['WBS ', {
    plain: '成果物と必要作業を、管理可能なレベルまで階層的に分解したもの。',
    when: ['スコープを漏れなく整理する', 'ワーク・パッケージへ分解する', '見積りや責任割当の土台を作る'],
    contrast: { title: 'スケジュールとの違い', body: 'WBSは「何を作る・何をするか」の分解で、作業順序を示すものではない。' },
    rule: 'WBSは100%ルール。順番ではなくスコープの分解。',
    example: '成果物を、見積り・担当設定が可能なワーク・パッケージまで分解する。',
  }],
  ['クリティカル・パス', {
    plain: 'プロジェクトの最短完了期間を決める、ネットワーク上の最長経路。',
    when: ['納期への影響を評価する', '短縮対象を選ぶ', 'フロートを確認する'],
    contrast: { title: '「最短経路」ではない', body: '最短期間を決めるのは、所要時間が最も長い経路。' },
    rule: '遅れると全体納期へ直結しやすい経路を優先して管理する。',
    example: '複数経路のうち、合計所要日数が最も長い経路を特定する。',
  }],
];

function profileFor(term: TermCard): LearningProfile {
  const hit = CURATED.find(([key]) => term.term.includes(key));
  if (hit) return hit[1];
  return {
    plain: term.examTip || term.definition,
    when: [
      '問題文にこの概念の特徴が現れたとき',
      '同じドメインの別概念と使い分ける必要があるとき',
      'PMとして次の行動を判断するとき',
    ],
    rule: term.examTip || '定義を丸暗記せず、「いつ使うか」と「何と違うか」を説明できるようにする。',
    example: term.definition,
  };
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function scoreOf(p: Progress, termId: string, skill: Skill): number {
  return p.skills[termId]?.[skill] ?? 0;
}

function overallSkill(p: Progress, skill: Skill): number {
  const values = TERMS.map((t) => scoreOf(p, t.id, skill));
  return Math.round(values.reduce((a, b) => a + b, 0) / Math.max(values.length, 1));
}

function masteryLevel(p: Progress, id: string): number {
  const s = p.skills[id] ?? {};
  const vals: Skill[] = ['concept', 'distinction', 'application', 'decision', 'retention'];
  const avg = vals.reduce((sum, k) => sum + (s[k] ?? 0), 0) / vals.length;
  if (avg >= 80) return 5;
  if (avg >= 60) return 4;
  if (avg >= 40) return 3;
  if (avg >= 20) return 2;
  if (avg > 0) return 1;
  return 0;
}

function AppV2() {
  const [screen, setScreen] = useState<Screen>('home');
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const award = (termId: string, skill: Skill, points: number) => {
    setProgress((p) => ({
      ...p,
      skills: {
        ...p.skills,
        [termId]: {
          ...p.skills[termId],
          [skill]: Math.min(100, Math.max(scoreOf(p, termId, skill), points)),
        },
      },
      lastSeen: { ...p.lastSeen, [termId]: new Date().toISOString() },
    }));
  };

  const recordTermAttempt = (term: TermCard, correct: boolean, skill: Skill) => {
    setProgress((p) => {
      const previousSeen = p.lastSeen[term.id];
      const days = previousSeen ? (Date.now() - new Date(previousSeen).getTime()) / 86400000 : 0;
      const nextSkills = {
        ...p.skills[term.id],
        [skill]: Math.min(100, Math.max(scoreOf(p, term.id, skill), correct ? 80 : 30)),
        ...(correct && days >= 1 ? { retention: Math.min(100, Math.max(scoreOf(p, term.id, 'retention'), 80)) } : {}),
      };
      return {
        ...p,
        skills: { ...p.skills, [term.id]: nextSkills },
        attempts: { ...p.attempts, [term.id]: (p.attempts[term.id] ?? 0) + 1 },
        correct: { ...p.correct, [term.id]: (p.correct[term.id] ?? 0) + (correct ? 1 : 0) },
        lastSeen: { ...p.lastSeen, [term.id]: new Date().toISOString() },
      };
    });
  };

  const recordScenario = (correct: boolean) => {
    setProgress((p) => ({
      ...p,
      scenarioAttempts: p.scenarioAttempts + 1,
      scenarioCorrect: p.scenarioCorrect + (correct ? 1 : 0),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <button onClick={() => setScreen('home')} className="flex items-center gap-3 text-left">
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 p-2"><GraduationCap size={26}/></div>
            <div><div className="font-black">PMP 2026 Master</div><div className="text-xs text-slate-400">Applied Learning v2</div></div>
          </button>
          <nav className="flex gap-1 overflow-x-auto rounded-xl bg-slate-900 p-1">
            {([
              ['home', Home, 'ホーム'], ['learn', BookOpen, '理解'], ['practice', Brain, '判断演習'],
              ['mock', Trophy, 'シナリオ模試'], ['glossary', Library, '用語集']
            ] as const).map(([key, Icon, label]) => (
              <button key={key} onClick={() => setScreen(key)} className={`flex min-w-fit items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold ${screen===key?'bg-white text-slate-950':'text-slate-300 hover:bg-slate-800'}`}>
                <Icon size={16}/>{label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-7">
        {screen === 'home' && <HomeScreen progress={progress} setScreen={setScreen}/>}
        {screen === 'learn' && <LearnScreen progress={progress} award={award} record={recordTermAttempt}/>}
        {screen === 'practice' && <PracticeScreen recordScenario={recordScenario}/>}
        {screen === 'mock' && <ScenarioMock progress={progress} setProgress={setProgress}/>}
        {screen === 'glossary' && <GlossaryScreen progress={progress}/>}
      </main>
      <footer className="border-t bg-white px-4 py-6 text-center text-xs text-slate-500">
        非公式学習ツール。PMI、PMP、PMBOKはProject Management Institute, Inc.の登録商標です。本アプリはPMIによる承認・認定を受けたものではありません。
      </footer>
    </div>
  );
}

function HomeScreen({progress,setScreen}:{progress:Progress;setScreen:(s:Screen)=>void}) {
  const scenarioAccuracy = progress.scenarioAttempts ? Math.round(progress.scenarioCorrect/progress.scenarioAttempts*100) : 0;
  const mastered = TERMS.filter(t=>masteryLevel(progress,t.id)>=4).length;
  return <div className="space-y-6">
    <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 p-7 text-white shadow-xl md:p-10">
      <div className="max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-400/10 px-3 py-1 text-sm font-bold text-blue-200"><Sparkles size={15}/>暗記ではなく、使える知識へ</div>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">理解 → 区別 → 適用 → 判断 → 定着</h1>
        <p className="mt-4 leading-relaxed text-slate-300">用語の意味だけでなく、いつ使うか、何と違うか、シナリオでどう判断するかまで学びます。</p>
        <div className="mt-6 flex gap-3"><button onClick={()=>setScreen('learn')} className="rounded-xl bg-white px-5 py-3 font-black text-slate-950">学習を始める</button><button onClick={()=>setScreen('practice')} className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-black">判断演習</button></div>
      </div>
    </section>
    <section className="grid gap-3 md:grid-cols-5">
      {(Object.keys(SKILL_LABEL) as Skill[]).map(skill=><div key={skill} className="rounded-2xl border bg-white p-4 shadow-sm"><div className="text-xs font-bold text-slate-500">{SKILL_LABEL[skill]}</div><div className="mt-2 text-3xl font-black">{overallSkill(progress,skill)}%</div></div>)}
    </section>
    <section className="grid gap-4 md:grid-cols-3">
      <Metric icon={Target} label="Level 4以上" value={`${mastered}/${TERMS.length}語`}/>
      <Metric icon={Brain} label="シナリオ正答率" value={`${scenarioAccuracy}%`}/>
      <Metric icon={Trophy} label="シナリオ模試ベスト" value={`${progress.bestScenarioMock}%`}/>
    </section>
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black">学習のルール</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">{['① 意味をつかむ','② 似た概念と区別','③ ミニケースで適用','④ FIRST/NEXT/BEST','⑤ 1日後に再回答'].map((x,i)=><div key={x} className="rounded-xl bg-slate-50 p-4 text-sm font-bold"><div className="mb-2 text-blue-600">Level {i+1}</div>{x}</div>)}</div>
    </section>
  </div>
}

function LearnScreen({progress,award,record}:{progress:Progress;award:(id:string,s:Skill,p:number)=>void;record:(t:TermCard,c:boolean,s:Skill)=>void}) {
  const [domain,setDomain]=useState<Domain|'all'>('all');
  const [index,setIndex]=useState(0);
  const [stage,setStage]=useState<0|1|2>(0);
  const [selected,setSelected]=useState<number|null>(null);
  const filtered=useMemo(()=>TERMS.filter(t=>t.priority==='core'&&(domain==='all'||t.domain===domain)),[domain]);
  useEffect(()=>{setIndex(0);setStage(0);setSelected(null)},[domain]);
  const term=filtered[index];
  if(!term) return <div>対象用語がありません。</div>;
  const profile=profileFor(term);
  const distractors=TERMS.filter(t=>t.id!==term.id&&t.domain===term.domain).slice(0,3);
  const options=[term,...distractors].sort((a,b)=>a.id.localeCompare(b.id));
  const answerIndex=options.findIndex(t=>t.id===term.id);
  const choose=(i:number)=>{if(selected!==null)return;setSelected(i);record(term,i===answerIndex,'application');};
  const next=()=>{setIndex(v=>Math.min(filtered.length-1,v+1));setStage(0);setSelected(null)};
  const prev=()=>{setIndex(v=>Math.max(0,v-1));setStage(0);setSelected(null)};
  return <div className="mx-auto max-w-4xl space-y-5">
    <Heading icon={BookOpen} title="理解して使う用語学習" subtitle="カードをめくるのではなく、3段階で概念を使える知識へ変えます。"/>
    <div className="rounded-2xl border bg-white p-4"><label className="text-xs font-black text-slate-500">ドメイン</label><select value={domain} onChange={e=>setDomain(e.target.value as Domain|'all')} className="mt-1 w-full rounded-xl border p-3 font-bold"><option value="all">全ドメイン</option><option value="people">People</option><option value="process">Process</option><option value="business">Business Environment</option></select></div>
    <div className="flex items-center justify-between text-sm font-bold text-slate-500"><span>{index+1}/{filtered.length}</span><span>Mastery Level {masteryLevel(progress,term.id)}/5</span></div>
    <div className="rounded-3xl border bg-white p-6 shadow-lg md:p-9">
      <div className="flex flex-wrap gap-2"><Pill>{DOMAIN_META[term.domain].label}</Pill>{term.approaches.map(a=><Pill key={a}>{APPROACH_META[a].label}</Pill>)}</div>
      <h2 className="mt-5 text-3xl font-black">{term.term}</h2>
      <div className="mt-6 flex gap-2">{['① 意味','② 使い分け','③ 適用'].map((x,i)=><button key={x} onClick={()=>{setStage(i as 0|1|2);setSelected(null); if(i===0) award(term.id,'concept',60); if(i===1) award(term.id,'distinction',60)}} className={`rounded-xl px-4 py-2 text-sm font-black ${stage===i?'bg-blue-700 text-white':'bg-slate-100 text-slate-600'}`}>{x}</button>)}</div>
      {stage===0 && <div className="mt-7 space-y-5">
        <Box label="ひとことで" text={profile.plain}/>
        <Box label="正式な定義" text={term.definition}/>
        {term.examTip && <Box label="試験ポイント" text={term.examTip}/>}
        <button onClick={()=>{award(term.id,'concept',80);setStage(1)}} className="w-full rounded-xl bg-blue-700 px-5 py-3 font-black text-white">説明できた → 使い分けへ</button>
      </div>}
      {stage===1 && <div className="mt-7 space-y-5">
        <div><div className="text-sm font-black text-blue-700">いつ使う？</div><ul className="mt-2 space-y-2">{profile.when.map(x=><li key={x} className="rounded-xl bg-slate-50 p-3">✓ {x}</li>)}</ul></div>
        {profile.contrast && <Box label={profile.contrast.title} text={profile.contrast.body}/>}
        <Box label="判断ルール" text={profile.rule}/>
        {profile.antiPattern && <Box label="やりがちな誤り" text={profile.antiPattern}/>}
        <button onClick={()=>{award(term.id,'distinction',80);setStage(2)}} className="w-full rounded-xl bg-violet-700 px-5 py-3 font-black text-white">区別できた → ミニケースへ</button>
      </div>}
      {stage===2 && <div className="mt-7">
        <div className="rounded-2xl bg-slate-950 p-5 text-white"><div className="text-xs font-black text-blue-300">MINI SCENARIO</div><p className="mt-2 text-lg font-bold leading-relaxed">{profile.example}</p><p className="mt-3 text-sm text-slate-300">この状況で最も関連する概念はどれ？</p></div>
        <div className="mt-4 space-y-2">{options.map((o,i)=><button key={o.id} disabled={selected!==null} onClick={()=>choose(i)} className={`w-full rounded-xl border-2 p-4 text-left font-bold ${selected===null?'hover:border-blue-400':i===answerIndex?'border-emerald-500 bg-emerald-50':i===selected?'border-red-400 bg-red-50':'opacity-50'}`}>{String.fromCharCode(65+i)}. {o.term}</button>)}</div>
        {selected!==null && <div className="mt-4 rounded-2xl bg-amber-50 p-5"><div className="font-black">{selected===answerIndex?'正解。使える知識になっています。':'ここを区別できるようにしましょう。'}</div><p className="mt-2">{profile.rule}</p><p className="mt-2 text-sm text-slate-600">正解：{term.term}</p></div>}
      </div>}
    </div>
    <div className="flex justify-between"><button disabled={index===0} onClick={prev} className="flex items-center gap-1 rounded-lg px-3 py-2 font-bold disabled:opacity-30"><ChevronLeft/>前へ</button><button disabled={index===filtered.length-1} onClick={next} className="flex items-center gap-1 rounded-lg px-3 py-2 font-bold disabled:opacity-30">次へ<ChevronRight/></button></div>
  </div>
}

function PracticeScreen({recordScenario}:{recordScenario:(c:boolean)=>void}) {
  const [domain,setDomain]=useState<Domain|'all'>('all');
  const [approach,setApproach]=useState<Approach|'all'>('all');
  const [questions,setQuestions]=useState<ScenarioQuestion[]>([]);
  const [index,setIndex]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const start=()=>{const pool=SCENARIOS.filter(q=>(domain==='all'||q.domain===domain)&&(approach==='all'||q.approach===approach));setQuestions([...pool].sort(()=>Math.random()-.5).slice(0,Math.min(10,pool.length)));setIndex(0);setSelected(null)};
  if(!questions.length) return <div className="mx-auto max-w-3xl space-y-5"><Heading icon={Brain} title="FIRST / NEXT / BEST 判断演習" subtitle="用語名ではなく、シナリオからPMとしての行動を選びます。"/><div className="rounded-3xl border bg-white p-7 shadow-lg"><div className="grid gap-3 md:grid-cols-2"><Select label="ドメイン" value={domain} onChange={v=>setDomain(v as Domain|'all')} options={[['all','全ドメイン'],['people','People'],['process','Process'],['business','Business Environment']]}/><Select label="アプローチ" value={approach} onChange={v=>setApproach(v as Approach|'all')} options={[['all','すべて'],['common','共通'],['predictive','予測型'],['agile','アジャイル'],['hybrid','ハイブリッド']]}/></div><button onClick={start} className="mt-6 w-full rounded-xl bg-blue-700 py-4 font-black text-white">10問の判断演習を開始</button></div></div>;
  const q=questions[index];
  const answer=(i:number)=>{if(selected!==null)return;setSelected(i);recordScenario(i===q.answer)};
  const next=()=>{if(index===questions.length-1){setQuestions([]);return;}setIndex(v=>v+1);setSelected(null)};
  return <div className="mx-auto max-w-4xl">
    <div className="mb-4 text-sm font-black text-slate-500">Q {index+1}/{questions.length}</div>
    <div className="rounded-3xl border bg-white p-7 shadow-lg">
      <div className="flex gap-2"><Pill>{DOMAIN_META[q.domain].label}</Pill><Pill>{APPROACH_META[q.approach].label}</Pill></div>
      <h2 className="mt-5 text-xl font-black leading-relaxed md:text-2xl">{q.question}</h2>
      <div className="mt-6 space-y-3">{q.options.map((o,i)=><button key={o} disabled={selected!==null} onClick={()=>answer(i)} className={`w-full rounded-xl border-2 p-4 text-left font-bold ${selected===null?'hover:border-blue-400':i===q.answer?'border-emerald-500 bg-emerald-50':i===selected?'border-red-400 bg-red-50':'opacity-50'}`}>{String.fromCharCode(65+i)}. {o}</button>)}</div>
      {selected!==null && <div className="mt-6 rounded-2xl bg-slate-50 p-5"><div className="flex items-center gap-2 font-black">{selected===q.answer?<CheckCircle2 className="text-emerald-600"/>:<XCircle className="text-red-500"/>}{selected===q.answer?'正解':'判断軸を確認'}</div><p className="mt-3 leading-relaxed">{q.explanation}</p><p className="mt-3 text-sm font-bold text-blue-700">PMPの見方：まず事実と根本原因を確認し、権限・価値・チーム・ガバナンスに沿って次の行動を選ぶ。</p></div>}
      {selected!==null&&<button onClick={next} className="mt-5 ml-auto flex items-center gap-1 rounded-xl bg-slate-900 px-5 py-3 font-black text-white">{index===questions.length-1?'終了':'次の問題'}<ChevronRight/></button>}
    </div>
  </div>
}

function ScenarioMock({progress,setProgress}:{progress:Progress;setProgress:React.Dispatch<React.SetStateAction<Progress>>}) {
  const [size,setSize]=useState<20|45>(20); const [qs,setQs]=useState<ScenarioQuestion[]>([]); const [idx,setIdx]=useState(0); const [answers,setAnswers]=useState<Record<string,number>>({}); const [done,setDone]=useState(false);
  const start=()=>{setQs([...SCENARIOS].sort(()=>Math.random()-.5).slice(0,size));setIdx(0);setAnswers({});setDone(false)};
  if(!qs.length) return <div className="mx-auto max-w-3xl space-y-5"><Heading icon={Trophy} title="シナリオ模試" subtitle="定義当てを排除し、収録済みのシナリオ問題だけで実戦練習します。"/><div className="rounded-3xl border bg-white p-7 shadow-lg"><p className="leading-relaxed text-slate-600">現在の問題バンクは{SCENARIOS.length}問です。180問を水増しせず、シナリオ問題を増やしながら本試験型へ近づけます。</p><div className="mt-5 grid grid-cols-2 gap-3">{([20,45] as const).map(n=><button key={n} onClick={()=>setSize(n)} className={`rounded-xl border-2 p-4 font-black ${size===n?'border-blue-600 bg-blue-50':'border-slate-200'}`}>{n}問</button>)}</div><button onClick={start} className="mt-5 w-full rounded-xl bg-slate-900 py-4 font-black text-white">模試開始</button></div></div>;
  const score=Math.round(qs.filter(q=>answers[q.id]===q.answer).length/qs.length*100);
  if(done) return <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-8 text-center shadow-lg"><Trophy className="mx-auto text-amber-500" size={50}/><h2 className="mt-4 text-3xl font-black">{score}%</h2><p className="mt-2 text-slate-600">{qs.filter(q=>answers[q.id]===q.answer).length}/{qs.length} 正解</p><button onClick={()=>setQs([])} className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-black text-white">メニューへ</button></div>;
  const q=qs[idx];
  const choose=(i:number)=>setAnswers(a=>({...a,[q.id]:i}));
  const next=()=>{if(idx===qs.length-1){setProgress(p=>({...p,bestScenarioMock:Math.max(p.bestScenarioMock,score)}));setDone(true)}else setIdx(v=>v+1)};
  return <div className="mx-auto max-w-4xl"><div className="mb-4 text-sm font-black text-slate-500">Q {idx+1}/{qs.length}</div><div className="rounded-3xl border bg-white p-7 shadow-lg"><h2 className="text-xl font-black leading-relaxed">{q.question}</h2><div className="mt-6 space-y-3">{q.options.map((o,i)=><button key={o} onClick={()=>choose(i)} className={`w-full rounded-xl border-2 p-4 text-left font-bold ${answers[q.id]===i?'border-blue-600 bg-blue-50':'border-slate-200'}`}>{String.fromCharCode(65+i)}. {o}</button>)}</div><button disabled={answers[q.id]===undefined} onClick={next} className="mt-6 ml-auto rounded-xl bg-slate-900 px-6 py-3 font-black text-white disabled:opacity-30">{idx===qs.length-1?'採点':'次へ'}</button></div></div>
}

function GlossaryScreen({progress}:{progress:Progress}) {
  const [query,setQuery]=useState('');
  const terms=TERMS.filter(t=>(t.term+' '+t.definition).toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-5"><Heading icon={Library} title="用語集" subtitle="定義だけでなく、現在のMastery Levelも確認できます。"/><div className="relative"><Search className="absolute left-4 top-3.5 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="用語・定義を検索" className="w-full rounded-xl border bg-white py-3 pl-12 pr-4"/></div><div className="grid gap-3 md:grid-cols-2">{terms.map(t=><div key={t.id} className="rounded-2xl border bg-white p-5"><div className="flex items-start justify-between gap-3"><div><div className="font-black">{t.term}</div><div className="mt-2 text-sm leading-relaxed text-slate-600">{t.definition}</div></div><div className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">Lv.{masteryLevel(progress,t.id)}</div></div></div>)}</div></div>
}

function Heading({icon:Icon,title,subtitle}:{icon:React.ComponentType<{size?:number}>;title:string;subtitle:string}) {return <div className="mb-5"><div className="flex items-center gap-3"><Icon size={28}/><h1 className="text-2xl font-black">{title}</h1></div><p className="mt-2 text-slate-600">{subtitle}</p></div>}
function Pill({children}:{children:React.ReactNode}) {return <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black">{children}</span>}
function Box({label,text}:{label:string;text:string}) {return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="text-sm font-black text-blue-700">{label}</div><p className="mt-2 leading-relaxed">{text}</p></div>}
function Metric({icon:Icon,label,value}:{icon:React.ComponentType<{size?:number;className?:string}>;label:string;value:string}) {return <div className="rounded-2xl border bg-white p-5 shadow-sm"><Icon size={22} className="text-blue-600"/><div className="mt-3 text-sm font-bold text-slate-500">{label}</div><div className="mt-1 text-2xl font-black">{value}</div></div>}
function Select({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:[string,string][]}) {return <label className="text-sm font-bold text-slate-600">{label}<select value={value} onChange={e=>onChange(e.target.value)} className="mt-1 w-full rounded-xl border p-3 text-slate-900">{options.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>}

export default AppV2;
