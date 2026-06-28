export type Domain = 'people' | 'process' | 'business';
export type Approach = 'predictive' | 'agile' | 'hybrid' | 'common';
export type Priority = 'core' | 'important' | 'supplemental';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TermCard {
  id: string;
  term: string;
  definition: string;
  domain: Domain;
  approaches: Approach[];
  priority: Priority;
  examTip: string;
  tags: string[];
}

export interface ScenarioQuestion {
  id: string;
  domain: Domain;
  approach: Approach;
  difficulty: Difficulty;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  tags: string[];
}

export const EXAM = {
  launchDate: '2026-07-09',
  questions: 180,
  minutes: 240,
  weights: { people: 33, process: 41, business: 26 } as const,
  note: '本アプリの80%基準は学習用です。PMIが公式合格点を公表したものではありません。',
} as const;

export const DOMAIN_META = {
  people: { label: 'People', ja: '人', weight: 33 },
  process: { label: 'Process', ja: 'プロセス', weight: 41 },
  business: { label: 'Business Environment', ja: 'ビジネス環境', weight: 26 },
} as const;

export const APPROACH_META = {
  common: { label: '共通' },
  predictive: { label: '予測型' },
  agile: { label: 'アジャイル' },
  hybrid: { label: 'ハイブリッド' },
} as const;

export const TERMS: TermCard[] = [
  {
    "id": "T001",
    "term": "WBS (Work Breakdown Structure)",
    "definition": "プロジェクトの成果物とプロジェクト・ワークを、より小さくマネジメントしやすい構成要素に階層的に要素分解したもの。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "WBSは作業順序ではなく、成果物と作業を100%ルールで分解する。",
    "tags": []
  },
  {
    "id": "T002",
    "term": "ステークホルダー (Stakeholder)",
    "definition": "プロジェクトの意思決定、活動、成果に影響を与える、または影響を受ける個人、グループ、組織。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T003",
    "term": "クリティカル・パス (Critical Path)",
    "definition": "スケジュール・ネットワーク上でプロジェクトの最短完了期間を決定する最長経路。通常はトータル・フロートが最小で、制約がなければゼロとなることが多い。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "最長経路＝最も日数が長い経路。最短経路ではない。",
    "tags": []
  },
  {
    "id": "T004",
    "term": "EVM (Earned Value Management)",
    "definition": "スコープ、スケジュール、資源の測定を統合し、プロジェクトのパフォーマンスと進捗を客観的に評価する手法。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T005",
    "term": "スコープ・クリープ (Scope Creep)",
    "definition": "時間、コスト、資源などの調整（正式な変更管理）を行わずに、プロジェクトのスコープが無統制に拡大していくこと。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T006",
    "term": "ベースライン (Baseline)",
    "definition": "プロジェクトのパフォーマンスを比較・測定するための基準となる、承認された計画（スコープ、スケジュール、コスト）。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T007",
    "term": "CCB (変更管理委員会)",
    "definition": "プロジェクトに対する変更要求を審査、評価、承認、延期、または却下する責任を持つ、公式に任命されたグループ。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T008",
    "term": "教訓登録簿 (Lessons Learned Register)",
    "definition": "プロジェクトの実行中に得られた知識（成功例、失敗例、改善点）を記録し、今後のプロジェクトやフェーズで活用するための文書。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T009",
    "term": "アーンド・バリュー (EV)",
    "definition": "実際に完了した作業の価値を、承認された予算で表したもの。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T010",
    "term": "プッシュ型コミュニケーション",
    "definition": "情報を必要とする特定の受信者に情報を送信・配布するが、相手が理解したかまでは確認しない方法（例：メール、報告書）。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T011",
    "term": "プル型コミュニケーション",
    "definition": "大量の情報や大規模な対象者向けで、受信者が自らの意思で情報にアクセスする方法（例：イントラネット、ポータルサイト）。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T012",
    "term": "インタラクティブ・コミュニケーション",
    "definition": "2つ以上の当事者間で多方向の情報のやり取りを行う、情報の共有に最も効率的な方法（例：会議、電話）。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T013",
    "term": "マイルストーン (Milestone)",
    "definition": "プロジェクトにおける重要な時点やイベント。期間はゼロとして扱われる。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T014",
    "term": "リスク・レジスター (Risk Register)",
    "definition": "特定された個別のプロジェクト・リスクの詳細（担当者、確率、影響度）や、リスク対応計画などを記録する文書。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T015",
    "term": "アジャイル・アプローチ",
    "definition": "反復的かつ漸進的なアプローチを用いて、変化に柔軟に対応しながら価値を継続的に提供する手法。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T016",
    "term": "プロジェクト憲章 (Project Charter)",
    "definition": "プロジェクトの存在を正式に承認し、プロジェクトマネジャーに組織の資源をプロジェクト活動に充当する権限を与える文書。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T017",
    "term": "プロジェクトマネジメント計画書",
    "definition": "プロジェクトをどのように実行し、監視・コントロールし、終結させるかを定義し、準備し、統合する文書。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T018",
    "term": "要求事項トレーサビリティ・マトリックス",
    "definition": "要求事項の発生源から、それを満たす成果物までを追跡するグリッド（表）。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T019",
    "term": "WBS辞書",
    "definition": "WBSの各構成要素に関する詳細なスケジュール、コスト、作業内容などを記述した文書。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T020",
    "term": "クラッシング (Crashing)",
    "definition": "コストを追加して資源を投下し、スケジュールの短縮を図る技法（例：残業、人員追加）。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "追加コストと引き換えに短縮。クリティカル・パス上で検討する。",
    "tags": []
  },
  {
    "id": "T021",
    "term": "ファスト・トラッキング (Fast Tracking)",
    "definition": "通常は順番に行うアクティビティやフェーズを、並行して（同時に）行うことでスケジュールを短縮する技法。リスクが増大しやすい。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "順次作業を並行化し、手戻りリスクを高める。",
    "tags": []
  },
  {
    "id": "T022",
    "term": "三点見積り (PERT)",
    "definition": "最楽観値（O）、最悲観値（P）、最可能値（M）を用いて不確実性を考慮する見積り技法。三角分布は（O+M+P）/3、PERTのベータ分布は（O+4M+P）/6。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T023",
    "term": "類推見積り (Analogous Estimating)",
    "definition": "過去の類似プロジェクトの履歴データを使用して、現在の期間やコストを見積もる手法。迅速だが精度は低い。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T024",
    "term": "パラメトリック見積り",
    "definition": "過去のデータとその他の変数（例：面積あたりの単価、コード行数）との統計的関係を用いて見積もる手法。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T025",
    "term": "ボトムアップ見積り",
    "definition": "個々のアクティビティやワーク・パッケージを詳細に見積もり、それらを積み上げて全体を見積もる手法。時間はかかるが精度が高い。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T026",
    "term": "コンティンジェンシー予備",
    "definition": "特定済みのリスクに対応するために確保するコストまたはスケジュールの予備。コストのコンティンジェンシー予備はコスト・ベースラインに含まれ、組織の権限・手順に従って使用する。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "既知の未知。コスト・ベースライン内。",
    "tags": []
  },
  {
    "id": "T027",
    "term": "マネジメント予備",
    "definition": "未特定の作業や予見できなかった事象に備える予備。コスト・ベースラインには含まれないが、プロジェクト予算には含まれ、使用時は組織の変更管理・ガバナンス手順に従う。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "未知の未知。コスト・ベースライン外、プロジェクト予算内。",
    "tags": []
  },
  {
    "id": "T028",
    "term": "品質保証 (QA: Quality Assurance)",
    "definition": "品質活動やプロセスが適切で有効かを監査・評価し、継続的に改善する活動。欠陥の予防とプロセス改善に重点を置く。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "予防・プロセス。QCは検査・成果物。",
    "tags": []
  },
  {
    "id": "T029",
    "term": "品質管理 (QC: Quality Control)",
    "definition": "成果物や作業結果を検査・測定し、品質要求事項と受け入れ基準を満たしているかを確認する活動。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "成果物の適合性を確認する。",
    "tags": []
  },
  {
    "id": "T030",
    "term": "管理図 (Control Chart)",
    "definition": "プロセスが安定しているか、予測可能なパフォーマンスを示しているかを判断するための図。上方/下方管理限界線がある。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T031",
    "term": "パレート図 (Pareto Chart)",
    "definition": "発生頻度の高い順に並べた棒グラフと累積比率の折れ線グラフ。「80:20の法則」に基づき、優先して解決すべき問題を特定する。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T032",
    "term": "特性要因図 (フィッシュボーン)",
    "definition": "問題（特性）とそれに影響を与える可能性のある原因（要因）との関係を整理し、根本原因を特定する図。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T033",
    "term": "タックマンモデル",
    "definition": "チーム形成の5つの段階。（成立期、動乱期、安定期、遂行期、解散期）。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T034",
    "term": "コンフリクト・マネジメント",
    "definition": "対立の原因、段階、緊急性、関係者、影響を分析し、協調／問題解決、妥協、鎮静、強制、撤退などから適切な方法を選ぶこと。長期的解決には協調／問題解決が有効なことが多い。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T035",
    "term": "定性的リスク分析",
    "definition": "特定されたリスクの「発生確率」と「影響度」を主観的に評価し、優先順位付けを行うプロセス。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T036",
    "term": "定量的リスク分析",
    "definition": "個別のリスクがプロジェクト目標に与える影響を数値的に分析するプロセス（例：モンテカルロ・シミュレーション）。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T037",
    "term": "感度分析 (トルネード図)",
    "definition": "どのリスクがプロジェクトに最も大きな影響を与える可能性があるかを比較・特定するための分析手法。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T038",
    "term": "リスク対応戦略（脅威・マイナス）",
    "definition": "「回避（原因を取り除く）」「転嫁（第三者に移す）」「軽減（確率や影響を下げる）」「受容（何もしない）」「エスカレーション」。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T039",
    "term": "リスク対応戦略（好機・プラス）",
    "definition": "「活用（確実に発生させる）」「共有（第三者と組む）」「強化（確率や影響を上げる）」「受容」「エスカレーション」。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T040",
    "term": "定額契約 (FP: Fixed-Price)",
    "definition": "明確に定義された製品・サービスについて、あらかじめ定めた価格を支払う契約。スコープが明確なら売り手がコスト超過リスクを多く負うが、変更には追加費用が生じる場合がある。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T041",
    "term": "実費償還契約 (CR: Cost-Reimbursable)",
    "definition": "作業にかかった実費に加えて、売り手の利益（フィー）を支払う契約。スコープが不明確な場合や変更が多い場合に適す。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T042",
    "term": "タイム・アンド・マテリアル契約 (T&M)",
    "definition": "要員の単価等は定額で、作業量に応じて支払うハイブリッド契約。小規模な増員や外部専門家の活用によく使われる。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T043",
    "term": "入札説明会 (ベンダー会議)",
    "definition": "提案書の提出前に、すべての潜在的売り手に対して調達要件の共通理解を図るための会議。特定の売り手を優遇してはならない。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T044",
    "term": "作業パフォーマンス・データ",
    "definition": "作業の実行中に収集された生の観察結果や測定値（例：完了した作業割合、発生したコストの金額）。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T045",
    "term": "作業パフォーマンス情報",
    "definition": "作業パフォーマンス・データを分析・統合し、文脈の中で解釈を加えた情報（例：予算超過の予測）。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T046",
    "term": "調達作業範囲記述書 (SOW)",
    "definition": "購入しようとする製品やサービスの内容を、売り手が提供可能かどうか判断できる程度に詳細に記述した文書。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T047",
    "term": "PESTLE分析",
    "definition": "ビジネス環境を分析するフレームワーク。政治、経済、社会、技術、法律、環境の頭文字。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T048",
    "term": "マズローの欲求階層説",
    "definition": "人間の欲求は「生理的、安全、社会的、承認、自己実現」の5段階のピラミッド状になっているという理論。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T049",
    "term": "期待理論 (Expectancy Theory)",
    "definition": "人は「努力すれば成果が出る（期待）」「成果が出れば報酬が得られる（道具性）」「その報酬には価値がある（誘意性）」と感じた時に動機づけられるという理論。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T050",
    "term": "X理論・Y理論",
    "definition": "マクレガーが提唱。X理論は「人間は怠け者で管理が必要」、Y理論は「人間は条件次第で自ら進んで働く」とする人間観。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T051",
    "term": "プロジェクト型組織",
    "definition": "プロジェクト・マネジャーが強力な権限を持ち、チームメンバーがプロジェクトに専任する組織構造。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T052",
    "term": "マトリックス型組織",
    "definition": "機能部門（縦割り）とプロジェクト（横串）の両方に所属する組織。権限の強さにより「弱い」「バランス型」「強い」に分かれる。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T053",
    "term": "機能型組織",
    "definition": "部門長が強い権限を持ち、各部門内で専門的な作業を行う伝統的な組織構造。PMの権限は非常に弱い。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T054",
    "term": "PMO (プロジェクトマネジメント・オフィス)",
    "definition": "プロジェクトに関連するガバナンス・プロセスを標準化し、資源、方法論、ツールなどを共有・促進する組織構造。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T055",
    "term": "リード (Lead)",
    "definition": "先行アクティビティが完了する前に、後続アクティビティを前倒しで開始できる時間。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T056",
    "term": "ラグ (Lag)",
    "definition": "先行アクティビティに対して、後続アクティビティを遅らせなければならない待機時間。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T057",
    "term": "トータル・フロート (総余裕時間)",
    "definition": "プロジェクト全体の完了日を遅らせることなく、特定のアクティビティを遅らせることができる時間。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T058",
    "term": "フリー・フロート (自由余裕時間)",
    "definition": "後続アクティビティの早期開始日を遅らせることなく、特定のアクティビティを遅らせることができる時間。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T059",
    "term": "資源平準化 (Resource Leveling)",
    "definition": "資源の制約（人数不足など）に合わせてスケジュールを調整する技法。クリティカル・パスが延びる可能性がある。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T060",
    "term": "資源平滑化 (Resource Smoothing)",
    "definition": "クリティカル・パスを変更せず（フロートの範囲内で）、資源の変動を滑らかにする技法。すべての制約を解決できるとは限らない。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T061",
    "term": "デルファイ法 (Delphi Technique)",
    "definition": "専門家グループから匿名でアンケート等により意見を収集し、要約してフィードバックすることを繰り返し、意見を収束させる合意形成手法。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T062",
    "term": "ノミナル・グループ技法",
    "definition": "ブレインストーミング等で出たアイデアに対して、参加者が無記名で投票を行い、優先順位を決定する技法。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T063",
    "term": "親和図 (Affinity Diagram)",
    "definition": "ブレインストーミングで出た大量のアイデアを、相互の関連性や類似性に基づいてグループ化し、整理する図。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T064",
    "term": "スケジュール・バリアンス (SV)",
    "definition": "SV = EV(アーンド・バリュー) - PV(プランド・バリュー)。プラスならスケジュール前倒し、マイナスなら遅延。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T065",
    "term": "コスト・バリアンス (CV)",
    "definition": "CV = EV(アーンド・バリュー) - AC(実コスト)。プラスなら予算内、マイナスなら予算超過。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T066",
    "term": "スケジュール効率指標 (SPI)",
    "definition": "SPI = EV / PV。1.0より大きければスケジュール良好、1.0未満なら遅延。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T067",
    "term": "コスト効率指標 (CPI)",
    "definition": "CPI = EV / AC。1.0より大きい場合はコスト効率が計画より良く、1.0未満の場合はコスト効率が計画を下回っている。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T068",
    "term": "完成時総予算 (BAC)",
    "definition": "プロジェクト完了時のベースライン予算の総額。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T069",
    "term": "残作業見積り (ETC)",
    "definition": "現時点からプロジェクトを完了させるまでに必要な追加コストの見積り。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T070",
    "term": "完成時見積り (EAC)",
    "definition": "EAC = AC(これまでの実コスト) + ETC(残作業の見積り)。プロジェクト完了時の最終的な総コスト予測。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T071",
    "term": "完了時差異 (VAC)",
    "definition": "VAC = BAC - EAC。計画予算と最終予測コストとの差額。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T072",
    "term": "期待金額価値 (EMV) 分析",
    "definition": "リスクの「発生確率」と「影響度(金額)」を掛け合わせて、リスクの金銭的価値を算出する分析手法。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T073",
    "term": "デシジョン・ツリー分析",
    "definition": "複数の選択肢がある場合に、それぞれの経路の確率とEMVを図解し、最適な選択を決定するための分析手法。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T074",
    "term": "モンテカルロ・シミュレーション",
    "definition": "確率分布を用いてコンピュータで乱数を発生させ、数千回のシミュレーションを行うことで、プロジェクトの期間やコストの確率を算出する手法。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T075",
    "term": "SWOT分析",
    "definition": "組織やプロジェクトを「強み(Strengths)」「弱み(Weaknesses)」「機会(Opportunities)」「脅威(Threats)」の4つの視点から分析する手法。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T076",
    "term": "プランニング・ポーカー",
    "definition": "アジャイル開発で用いられる相対見積りの手法。チーム全員が同時にカードを出し合い、ストーリーポイントを見積もる。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T077",
    "term": "スプリント (Sprint)",
    "definition": "スクラムにおける1か月以内の固定長イベント。スプリント・ゴールの達成に向けて、計画、デイリー・スクラム、レビュー、レトロスペクティブを内包する。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T078",
    "term": "プロダクト・バックログ",
    "definition": "プロダクトを改善するために必要なものを記載した、創発的かつ順序付けられたリスト。スクラムチームが取り組む作業の唯一の情報源で、プロダクト・オーナーが効果的な管理に責任を持つ。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "単なる固定リストではなく、継続的に詳細化される。",
    "tags": []
  },
  {
    "id": "T079",
    "term": "スプリント・バックログ",
    "definition": "プロダクト・バックログからスプリント向けに選択されたアイテムと、それを実現するための作業計画のセット。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T080",
    "term": "スクラムマスター",
    "definition": "スクラムが理解され実践されるよう、スクラムチームと組織を支援する真のリーダー。障害除去を促進するが、チームの上司や作業割当者ではない。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T081",
    "term": "プロダクト・オーナー",
    "definition": "スクラムチームの作業から生じるプロダクト価値を最大化し、プロダクト・バックログの効果的な管理に責任を持つ一人のアカウンタビリティ。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T082",
    "term": "デイリー・スクラム",
    "definition": "スプリント・ゴールに向けた進捗を検査し、必要に応じてスプリント・バックログを適応させる、開発者のための15分間のイベント。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "進捗報告会ではなく、開発者が計画を適応する場。",
    "tags": []
  },
  {
    "id": "T083",
    "term": "スプリント・レビュー",
    "definition": "スプリントの成果を検査し、プロダクト・ゴールへの進捗や環境変化を踏まえて、今後の適応をステークホルダーと協働して検討するイベント。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T084",
    "term": "スプリント・レトロスペクティブ",
    "definition": "品質と有効性を高める方法を計画するため、個人、相互作用、プロセス、ツール、完了の定義などを検査し改善策を決めるスクラムイベント。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T085",
    "term": "タイムボックス",
    "definition": "会議や作業に対して割り当てられた、事前に決められた最大時間。時間を延長することはしない。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T086",
    "term": "ベロシティ (Velocity)",
    "definition": "アジャイルチームが1回のスプリントで完了できる作業量（通常はストーリーポイントの合計）の尺度。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T087",
    "term": "バーンダウン・チャート",
    "definition": "残作業量（縦軸）と時間（横軸）をグラフ化し、目標達成までの進捗と傾向を視覚化するツール。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T088",
    "term": "カンバン・ボード",
    "definition": "作業をカードとして視覚化し、「未着手」「進行中」「完了」などの列を移動させることで、ワークフローを管理するツール。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T089",
    "term": "WIP (Work in Progress) 制限",
    "definition": "カンバンにおいて、各プロセス（列）で同時に進行できる作業項目数の上限を定めること。ボトルネックの発見に役立つ。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T090",
    "term": "バリューストリーム・マッピング",
    "definition": "顧客に価値を提供するまでの情報の流れや物の流れを視覚化し、無駄（付加価値を生まない作業）を特定するリーン手法。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T091",
    "term": "MVP (Minimum Viable Product)",
    "definition": "顧客に価値を提供し、フィードバックを得るために必要な「最小限の機能」を備えたプロダクト。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T092",
    "term": "ユーザーストーリー",
    "definition": "「誰が」「何を」「なぜ」求めているのかを、ユーザーの視点から短く簡潔に記述した要求事項の表現方法。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T093",
    "term": "受け入れ基準 (Acceptance Criteria)",
    "definition": "特定のユーザーストーリーが完了したとみなされるために満たさなければならない、具体的な条件のリスト。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T094",
    "term": "完了の定義 (DoD: Definition of Done)",
    "definition": "インクリメントがプロダクトに求められる品質基準を満たした状態を正式に記述したもの。満たさない作業はインクリメントの一部とはみなされない。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T095",
    "term": "情報ラジエーター",
    "definition": "カンバンボードやバーンダウンチャートなど、プロジェクトの状況を誰もが常に一目でわかるように物理的・視覚的に掲示するもの。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T096",
    "term": "サーバント・リーダーシップ",
    "definition": "リーダーがチームメンバーに奉仕し、彼らが最高のパフォーマンスを発揮できるように支援し障害を取り除くリーダーシップ・スタイル。",
    "domain": "process",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T097",
    "term": "テーラリング (Tailoring)",
    "definition": "プロジェクトの特定の環境やニーズに合わせて、プロジェクトマネジメントの手法、プロセス、ツール等を適切に調整・選択すること。",
    "domain": "process",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T098",
    "term": "コンダクト・プロキュアメント",
    "definition": "（調達の実行）売り手から回答を得て、売り手を選定し、契約を締結するプロセス。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T099",
    "term": "OEE (総合設備効率)",
    "definition": "設備の稼働率、性能、品質の3つの要素から、生産設備の総合的な効率を測定するリーン生産方式の指標。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "supplemental",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T100",
    "term": "ハロー効果 (Halo Effect)",
    "definition": "ある人が一つの分野で優れていると、他の無関係な分野でも優れていると錯覚してしまう心理的バイアス。（例：優秀なプログラマだから優秀なPMになれると思い込む）",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "",
    "tags": []
  },
  {
    "id": "T101",
    "term": "感情的知性（Emotional Intelligence）",
    "definition": "自分と他者の感情を認識・理解し、行動や関係性を適切に調整する能力。自己認識、自己管理、社会的認識、関係性管理を含む。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "対立や抵抗の場面では、まず感情と背景を理解してから行動する。",
    "tags": [
      "leadership"
    ]
  },
  {
    "id": "T102",
    "term": "アクティブ・リスニング",
    "definition": "相手の発言を遮らずに聴き、言い換え、要約、質問、非言語的反応を通じて理解を確認する技法。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "PMPでは、推測して解決する前に話を聴き、事実を確認する。",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "T103",
    "term": "コーチング",
    "definition": "質問やフィードバックを通じて、本人が答えを見つけ、能力を高められるよう支援すること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "能力向上と自律性が目的。答えを一方的に教えるのはトレーニング寄り。",
    "tags": [
      "leadership"
    ]
  },
  {
    "id": "T104",
    "term": "メンタリング",
    "definition": "経験豊富な人が、経験や助言を共有して長期的な成長を支援すること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "コーチングとの違いを押さえる。",
    "tags": [
      "leadership"
    ]
  },
  {
    "id": "T105",
    "term": "ファシリテーション",
    "definition": "中立的な立場で、参加者の対話、合意形成、意思決定、問題解決を促進すること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "PMが答えを決めるのではなく、チームが決められる場をつくる。",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "T106",
    "term": "交渉（Negotiation）",
    "definition": "利害や要求が異なる当事者間で、相互に受け入れ可能な合意を形成するプロセス。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "立場ではなく利益に着目し、Win-Winを探る。",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "T107",
    "term": "BATNA",
    "definition": "交渉が合意に至らなかった場合に取り得る最善の代替案。交渉力と撤退基準を判断する基礎になる。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "交渉前に把握しておく。",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "T108",
    "term": "チーム憲章（Team Charter）",
    "definition": "チームの価値観、合意事項、コミュニケーション、意思決定、対立解決などの運営ルールを定める文書。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "チーム自身が作成・合意すると遵守されやすい。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T109",
    "term": "グラウンドルール",
    "definition": "会議や協働における期待行動、連絡方法、時間、対立時の対応など、チームが守る基本ルール。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "違反が起きたら、まず合意済みルールを参照する。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T110",
    "term": "心理的安全性",
    "definition": "質問、異論、失敗、懸念を表明しても、対人関係上の不利益を受けないと感じられる状態。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "発言しないメンバーを責めず、安心して話せる環境を整える。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T111",
    "term": "自己組織化チーム",
    "definition": "目標達成のために、作業方法や役割分担をチーム自身が決定・調整するチーム。",
    "domain": "people",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "PMやスクラムマスターは作業を割り当てない。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T112",
    "term": "クロスファンクショナル・チーム",
    "definition": "価値ある成果を完成させるために必要な複数の専門能力を内部に備えたチーム。",
    "domain": "people",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "外部引継ぎを減らし、価値提供を速める。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T113",
    "term": "サーバント・リーダー",
    "definition": "チームへの奉仕を優先し、障害除去、成長支援、権限移譲によってチームの成果を高めるリーダー。",
    "domain": "people",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "チームを管理・命令する役ではない。",
    "tags": [
      "leadership"
    ]
  },
  {
    "id": "T114",
    "term": "シチュエーショナル・リーダーシップ",
    "definition": "チームの成熟度、能力、意欲、状況に応じて、指示・コーチング・支援・委任などのスタイルを使い分ける考え方。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "常に同じリーダーシップが最善ではない。",
    "tags": [
      "leadership"
    ]
  },
  {
    "id": "T115",
    "term": "変革型リーダーシップ",
    "definition": "魅力的なビジョンを示し、動機づけと成長支援を通じて、メンバーが期待以上の成果を生み出すよう促すスタイル。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "変化や高い不確実性の場面で有効。",
    "tags": [
      "leadership"
    ]
  },
  {
    "id": "T116",
    "term": "取引型リーダーシップ",
    "definition": "目標、役割、報酬、是正措置を明確にし、成果と対価の交換を中心に導くスタイル。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "安定した環境や定型業務で機能しやすい。",
    "tags": [
      "leadership"
    ]
  },
  {
    "id": "T117",
    "term": "権限移譲（Empowerment）",
    "definition": "必要な情報、権限、資源をチームに与え、意思決定と行動を自律的に行えるようにすること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "責任だけを渡すのではなく、権限と支援も渡す。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T118",
    "term": "RACIマトリックス",
    "definition": "活動と役割の関係を、実行責任者、説明責任者、協議先、報告先で整理する責任分担表。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "Accountableは通常1活動につき1人が明確。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T119",
    "term": "RAM（責任分担マトリックス）",
    "definition": "WBSの作業要素と担当組織・個人を対応付け、責任関係を明確にする表。RACIは代表例。",
    "domain": "people",
    "approaches": [
      "predictive",
      "hybrid"
    ],
    "priority": "important",
    "examTip": "WBSとOBSの交点を示す。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T120",
    "term": "バーチャルチーム",
    "definition": "地理的・組織的に離れたメンバーが、デジタル技術を用いて協働するチーム。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "時差、文化、通信手段、信頼形成を意図的に設計する。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T121",
    "term": "文化的認識（Cultural Awareness）",
    "definition": "文化、価値観、言語、働き方の違いが、意思決定やコミュニケーションに与える影響を理解すること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "自分の文化的前提を標準と思い込まない。",
    "tags": [
      "diversity"
    ]
  },
  {
    "id": "T122",
    "term": "多様性・公平性・包摂性（DEI）",
    "definition": "多様な背景を尊重し、公平な機会と参加条件を整え、誰もが貢献できる状態をつくる考え方。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "単に人数を多様にするだけでなく、意思決定への参加を保障する。",
    "tags": [
      "diversity"
    ]
  },
  {
    "id": "T123",
    "term": "ステークホルダー・エンゲージメント",
    "definition": "ステークホルダーのニーズ、期待、影響力を理解し、適切な関与を通じて支持と価値共創を高める活動。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "一方向の情報提供ではなく、継続的な関係構築。",
    "tags": [
      "stakeholder"
    ]
  },
  {
    "id": "T124",
    "term": "パワー／関心度グリッド",
    "definition": "ステークホルダーを権力と関心の高低で分類し、管理・満足・情報提供・監視の方針を検討する分析手法。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "分類は固定ではなく、状況に応じて更新する。",
    "tags": [
      "stakeholder"
    ]
  },
  {
    "id": "T125",
    "term": "顕著性モデル（Salience Model）",
    "definition": "ステークホルダーを権力、正当性、緊急性の3属性で分析し、優先度を判断するモデル。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "3属性をすべて持つステークホルダーは高い注意が必要。",
    "tags": [
      "stakeholder"
    ]
  },
  {
    "id": "T126",
    "term": "コミュニケーション要求事項分析",
    "definition": "誰が、何を、いつ、どの形式・頻度・チャネルで必要とするかを分析すること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "相手ごとに必要情報と方法を調整する。",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "T127",
    "term": "コミュニケーション・チャネル数",
    "definition": "n人の間に存在し得る双方向チャネル数は n(n-1)/2。チーム人数増加に伴う複雑性の目安。",
    "domain": "people",
    "approaches": [
      "predictive"
    ],
    "priority": "important",
    "examTip": "人数が1人増えるとチャネルは1本だけ増えるわけではない。",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "T128",
    "term": "非言語コミュニケーション",
    "definition": "表情、姿勢、視線、声の調子、沈黙など、言葉以外で伝わる情報。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "対面・オンラインともに言語情報だけで判断しない。",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "T129",
    "term": "フィードバック・ループ",
    "definition": "成果や行動に対する反応を受け取り、次の行動や計画に反映する循環。短いほど適応が速くなる。",
    "domain": "people",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "レビュー、デモ、テスト、顧客反応が代表例。",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "T130",
    "term": "合意形成（Consensus）",
    "definition": "全員の第一希望とは限らないが、関係者が意思決定を支持し実行に協力できる状態をつくること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "全会一致と同義ではない。",
    "tags": [
      "decision"
    ]
  },
  {
    "id": "T131",
    "term": "多数決",
    "definition": "選択肢のうち過半数の支持を得た案を採用する意思決定方法。迅速だが少数意見への配慮が必要。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "重要な対立では合意形成の代替にならない場合がある。",
    "tags": [
      "decision"
    ]
  },
  {
    "id": "T132",
    "term": "複数基準意思決定分析（MCDA）",
    "definition": "複数の評価基準に重みを付け、選択肢を定量・定性的に比較して意思決定を支援する手法。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "ベンダー選定や優先順位付けに利用できる。",
    "tags": [
      "decision"
    ]
  },
  {
    "id": "T133",
    "term": "チーム・パフォーマンス評価",
    "definition": "チームの有効性、協働、能力、成果、改善状況を継続的に評価すること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "個人査定だけでなくチーム全体の改善に使う。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T134",
    "term": "トレーニング",
    "definition": "特定の知識や技能を体系的に習得させる活動。能力不足が確認された場合の対応策の一つ。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "まず能力ギャップを確認し、適切な支援を選ぶ。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T135",
    "term": "認識と報奨（Recognition and Rewards）",
    "definition": "望ましい貢献や成果を適切な時期・方法で認め、動機づけと行動強化につなげること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "個人差と文化差に配慮し、達成可能な行動に報いる。",
    "tags": [
      "motivation"
    ]
  },
  {
    "id": "T136",
    "term": "衛生要因・動機づけ要因（ハーズバーグ）",
    "definition": "不満を防ぐ給与・環境などの衛生要因と、満足を高める達成・承認・成長などの動機づけ要因を区別する理論。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "衛生要因を整えるだけでは高い動機づけにならない。",
    "tags": [
      "motivation"
    ]
  },
  {
    "id": "T137",
    "term": "獲得ニーズ理論（マクレランド）",
    "definition": "人の主要な動機を達成、権力、親和のニーズで捉える理論。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "メンバーごとの動機の違いを理解する。",
    "tags": [
      "motivation"
    ]
  },
  {
    "id": "T138",
    "term": "チーム形成（Team Building）",
    "definition": "信頼、協働、関係性、共通目的を高め、チームとしての有効性を向上させる継続的活動。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "一度のイベントではなく継続する。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T139",
    "term": "ペアリング／ペアワーク",
    "definition": "2人が同じ作業に協働して取り組み、知識共有、品質向上、属人化防止を図る方法。",
    "domain": "people",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "important",
    "examTip": "クロストレーニングにも役立つ。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T140",
    "term": "知識移転",
    "definition": "暗黙知・形式知を共有し、特定個人への依存を減らし、組織やチームの能力を高める活動。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "プロジェクト終結時だけでなく継続的に行う。",
    "tags": [
      "knowledge"
    ]
  },
  {
    "id": "T141",
    "term": "コミュニティ・オブ・プラクティス",
    "definition": "共通の専門領域や課題を持つ人々が、継続的に知識・経験・実践を共有する集まり。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "組織横断の学習と標準化を支援する。",
    "tags": [
      "knowledge"
    ]
  },
  {
    "id": "T142",
    "term": "対立の5段階",
    "definition": "不一致、対立、激化、膠着、解決など、対立が進行する程度を捉え、段階に応じて介入する考え方。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "早期ほど協働的な解決がしやすい。",
    "tags": [
      "conflict"
    ]
  },
  {
    "id": "T143",
    "term": "コンフリクトの協調／問題解決",
    "definition": "当事者が率直に情報を共有し、根本原因を扱って双方が受け入れられる解決を目指す方法。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "長期的なWin-Winを目指す。",
    "tags": [
      "conflict"
    ]
  },
  {
    "id": "T144",
    "term": "コンフリクトの妥協／和解",
    "definition": "各当事者が一部を譲り、部分的に満足できる解決を短時間で形成する方法。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "完全なWin-Winではないが、時間制約下で有効。",
    "tags": [
      "conflict"
    ]
  },
  {
    "id": "T145",
    "term": "コンフリクトの鎮静／適応",
    "definition": "共通点を強調し、相違点を一時的に小さく扱う方法。関係維持には役立つが根本原因は残り得る。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "恒久解決ではない場合が多い。",
    "tags": [
      "conflict"
    ]
  },
  {
    "id": "T146",
    "term": "コンフリクトの強制／指示",
    "definition": "一方の立場を権限で採用するWin-Lose型の方法。緊急時には必要だが関係悪化のリスクがある。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "安全や法令など即時判断が必要な場面に限る。",
    "tags": [
      "conflict"
    ]
  },
  {
    "id": "T147",
    "term": "コンフリクトの撤退／回避",
    "definition": "対立への対応を延期または離脱する方法。冷却期間には使えるが、問題は未解決のまま残る。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "重要問題の先送りにしない。",
    "tags": [
      "conflict"
    ]
  },
  {
    "id": "T148",
    "term": "ステークホルダー・エンゲージメント評価マトリックス",
    "definition": "各ステークホルダーの現在と望ましい関与度を、不認識・抵抗・中立・支持・主導などで比較する表。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "差分を埋める行動を計画する。",
    "tags": [
      "stakeholder"
    ]
  },
  {
    "id": "T149",
    "term": "意思決定のエスカレーション",
    "definition": "チームの権限や許容範囲を超える事項を、定められたガバナンス経路で上位者へ判断依頼すること。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "まず権限境界を確認し、何でもスポンサーへ丸投げしない。",
    "tags": [
      "decision"
    ]
  },
  {
    "id": "T150",
    "term": "責任（Responsibility）と説明責任（Accountability）",
    "definition": "Responsibilityは作業を実行する責任、Accountabilityは結果について最終的に説明し引き受ける責任。",
    "domain": "people",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "RACIで混同しやすい。",
    "tags": [
      "team"
    ]
  },
  {
    "id": "T151",
    "term": "プロジェクト・ライフサイクル",
    "definition": "プロジェクト開始から終結までの一連のフェーズ。予測型、反復型、漸進型、適応型、ハイブリッドなどにテーラリングされる。",
    "domain": "process",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "製品ライフサイクルとは区別する。",
    "tags": [
      "lifecycle"
    ]
  },
  {
    "id": "T152",
    "term": "開発アプローチ",
    "definition": "成果物をどのように開発するかを定める方法。予測型、適応型、ハイブリッドなどを状況に合わせて選択する。",
    "domain": "process",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "唯一の正解ではなく、文脈に合わせる。",
    "tags": [
      "lifecycle"
    ]
  },
  {
    "id": "T153",
    "term": "予測型アプローチ",
    "definition": "スコープ、期間、コストを早期に詳細化し、順次計画・実行するアプローチ。要求が安定し変更コストが高い場合に適する。",
    "domain": "process",
    "approaches": [
      "predictive"
    ],
    "priority": "core",
    "examTip": "変更は禁止ではなく、統合変更管理で扱う。",
    "tags": [
      "lifecycle"
    ]
  },
  {
    "id": "T154",
    "term": "反復型アプローチ",
    "definition": "繰り返し作成・評価しながら、解決策や成果物の理解と品質を徐々に高めるアプローチ。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "各反復で学習を深める。",
    "tags": [
      "lifecycle"
    ]
  },
  {
    "id": "T155",
    "term": "漸進型アプローチ",
    "definition": "使用可能な成果物を段階的に追加し、機能や能力を増やしていくアプローチ。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "価値を部分的に早く提供する。",
    "tags": [
      "lifecycle"
    ]
  },
  {
    "id": "T156",
    "term": "適応型アプローチ",
    "definition": "短い反復、継続的フィードバック、頻繁な優先順位変更を通じて高い不確実性に対応するアプローチ。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "詳細計画は必要な時点で行う。",
    "tags": [
      "lifecycle"
    ]
  },
  {
    "id": "T157",
    "term": "ハイブリッド・アプローチ",
    "definition": "予測型と適応型など複数のアプローチを組み合わせ、成果物や状況に応じて使い分ける方法。",
    "domain": "process",
    "approaches": [
      "hybrid"
    ],
    "priority": "core",
    "examTip": "単なる中途半端ではなく、意図的なテーラリング。",
    "tags": [
      "lifecycle"
    ]
  },
  {
    "id": "T158",
    "term": "段階的詳細化（Progressive Elaboration）",
    "definition": "情報が増えるにつれて、計画や成果物の詳細度と正確性を継続的に高めること。",
    "domain": "process",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "計画は一度作って固定するものではない。",
    "tags": [
      "planning"
    ]
  },
  {
    "id": "T159",
    "term": "ローリング・ウェーブ計画法",
    "definition": "近い将来の作業は詳細に、遠い将来の作業は高いレベルで計画し、時期が近づくにつれて詳細化する技法。",
    "domain": "process",
    "approaches": [
      "predictive",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "段階的詳細化の代表例。",
    "tags": [
      "planning"
    ]
  },
  {
    "id": "T160",
    "term": "バックログ・リファインメント",
    "definition": "プロダクト・バックログ項目を分割、明確化、見積り、順序付けし、将来の作業に備える継続的活動。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "正式なスクラムイベントではなく継続活動。",
    "tags": [
      "agile"
    ]
  },
  {
    "id": "T161",
    "term": "プロダクト・ゴール",
    "definition": "スクラムチームが計画するための長期的な将来状態を表す、プロダクト・バックログのコミットメント。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "一度に複数の競合するゴールを追わない。",
    "tags": [
      "scrum"
    ]
  },
  {
    "id": "T162",
    "term": "スプリント・ゴール",
    "definition": "スプリントが価値を持つ理由を示す単一の目的。スプリント・バックログのコミットメント。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "作業項目は調整できても、ゴールを危険にさらす変更は避ける。",
    "tags": [
      "scrum"
    ]
  },
  {
    "id": "T163",
    "term": "インクリメント",
    "definition": "過去のすべてのインクリメントに追加され、完了の定義を満たした、使用可能で検証可能なプロダクトの一歩。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "レビューを待たずにリリース可能。",
    "tags": [
      "scrum"
    ]
  },
  {
    "id": "T164",
    "term": "スプリント・プランニング",
    "definition": "なぜ価値があるか、何を完了できるか、どのように行うかをスクラムチームが協働して計画するイベント。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "core",
    "examTip": "ゴール、選択項目、実行計画を形成する。",
    "tags": [
      "scrum"
    ]
  },
  {
    "id": "T165",
    "term": "フロー効率",
    "definition": "作業がシステム内に存在する総時間のうち、実際に価値を生む作業時間の割合。待ち時間の削減に使う。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "important",
    "examTip": "忙しさではなく流れ全体を見る。",
    "tags": [
      "flow"
    ]
  },
  {
    "id": "T166",
    "term": "サイクルタイム",
    "definition": "作業項目の着手から完了までに要した時間。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "リードタイムとの起点の違いに注意。",
    "tags": [
      "flow"
    ]
  },
  {
    "id": "T167",
    "term": "リードタイム",
    "definition": "要求や注文の発生から価値の提供・完了までに要する総時間。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "顧客視点の待ち時間を含む。",
    "tags": [
      "flow"
    ]
  },
  {
    "id": "T168",
    "term": "累積フロー図（CFD）",
    "definition": "各ワークフロー状態にある作業量を時間軸で積み上げ表示し、WIP、スループット、ボトルネックを可視化する図。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "帯が広がる工程は滞留の可能性。",
    "tags": [
      "flow"
    ]
  },
  {
    "id": "T169",
    "term": "スループット",
    "definition": "一定期間に完了した作業項目数。フローの成果量を表す。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "important",
    "examTip": "個人の稼働率ではなくシステム全体を見る。",
    "tags": [
      "flow"
    ]
  },
  {
    "id": "T170",
    "term": "価値に基づく優先順位付け",
    "definition": "ビジネス価値、リスク、依存関係、コスト、学習などを踏まえ、価値の高い作業から実施する考え方。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "単純な声の大きさで決めない。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T171",
    "term": "MoSCoW法",
    "definition": "要求事項をMust、Should、Could、Won't have this timeに分類する優先順位付け手法。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "important",
    "examTip": "Mustを増やしすぎない。",
    "tags": [
      "prioritization"
    ]
  },
  {
    "id": "T172",
    "term": "WSJF",
    "definition": "遅延コストをジョブサイズで割り、短時間で高い経済価値を生む作業を優先する方法。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "important",
    "examTip": "値が大きいほど優先。",
    "tags": [
      "prioritization"
    ]
  },
  {
    "id": "T173",
    "term": "技術的負債",
    "definition": "短期的な便宜のために選んだ設計・実装上の妥協が、将来の変更・保守コストとして蓄積したもの。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "見えないまま放置せず、バックログで管理する。",
    "tags": [
      "quality"
    ]
  },
  {
    "id": "T174",
    "term": "スパイク",
    "definition": "不確実性を減らすため、調査、実験、プロトタイプ作成などを時間制限付きで行う作業。",
    "domain": "process",
    "approaches": [
      "agile"
    ],
    "priority": "important",
    "examTip": "価値提供そのものより学習が目的。",
    "tags": [
      "agile"
    ]
  },
  {
    "id": "T175",
    "term": "プロトタイプ",
    "definition": "要求や設計を検証するために作る初期モデル。フィードバックを得て不確実性を減らす。",
    "domain": "process",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "最終成果物と誤認させない。",
    "tags": [
      "requirements"
    ]
  },
  {
    "id": "T176",
    "term": "仮説駆動開発",
    "definition": "価値や顧客行動に関する仮説を置き、最小限の実験とデータで検証して次の判断につなげる方法。",
    "domain": "process",
    "approaches": [
      "agile",
      "hybrid"
    ],
    "priority": "important",
    "examTip": "作ることではなく学ぶことを成功基準にする。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T177",
    "term": "ビジネスケース",
    "definition": "プロジェクトを実施する経済的・戦略的根拠を示し、期待便益、コスト、リスク、選択肢などを比較する文書。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "プロジェクト中も妥当性を継続確認する。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T178",
    "term": "ベネフィット・マネジメント計画書",
    "definition": "便益をいつ、どのように測定・実現・維持し、誰が責任を持つかを定める文書。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "成果物完成後も便益実現は続くことがある。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T179",
    "term": "便益（Benefit）",
    "definition": "プロジェクトの成果によってステークホルダーや組織にもたらされる、測定可能な改善や価値。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "アウトプットそのものではない。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T180",
    "term": "アウトプット",
    "definition": "プロジェクト活動から直接生成される成果物、製品、サービス、結果。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "アウトカムや便益と区別する。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T181",
    "term": "アウトカム",
    "definition": "アウトプットの利用によって生じる行動、能力、状態、業績などの変化。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "成果物を納品しただけではアウトカムが出たとは限らない。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T182",
    "term": "価値（Value）",
    "definition": "ステークホルダーが認識する便益や有用性。財務的価値だけでなく、社会的・顧客・学習・リスク低減価値も含む。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "価値は受け手によって異なる。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T183",
    "term": "価値提供システム",
    "definition": "ポートフォリオ、プログラム、プロジェクト、運用などが連携し、組織戦略から価値を生み出す仕組み。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "プロジェクト単独ではなく全体の流れを見る。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T184",
    "term": "戦略的整合性",
    "definition": "プロジェクトの目的、成果、投資が、組織の戦略目標や優先事項と一致している状態。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "整合しなくなったら継続・変更・中止を検討する。",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "T185",
    "term": "プロジェクト・ガバナンス",
    "definition": "意思決定権限、責任、監督、エスカレーション、承認、報告など、プロジェクトを方向付け統制する枠組み。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "PMの裁量範囲を明確にする。",
    "tags": [
      "governance"
    ]
  },
  {
    "id": "T186",
    "term": "ガバナンス・ゲート",
    "definition": "フェーズ移行や投資継続の節目で、成果、リスク、価値、適合性を評価し、継続・修正・中止を判断する仕組み。",
    "domain": "business",
    "approaches": [
      "predictive",
      "hybrid"
    ],
    "priority": "core",
    "examTip": "単なる進捗報告ではなく意思決定点。",
    "tags": [
      "governance"
    ]
  },
  {
    "id": "T187",
    "term": "スポンサー",
    "definition": "プロジェクトの資源と支援を確保し、ビジネス上の説明責任を担い、PMの権限を超える意思決定を支援する人物。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "日常の作業管理者ではない。",
    "tags": [
      "governance"
    ]
  },
  {
    "id": "T188",
    "term": "ベネフィット・オーナー",
    "definition": "特定の便益の実現、測定、維持について責任を持つ人物または役割。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "PMと同一とは限らない。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T189",
    "term": "PMOの支援型",
    "definition": "テンプレート、ベストプラクティス、研修、情報提供などを行い、プロジェクトへの統制は低いPMO。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "Supportive＝低統制。",
    "tags": [
      "pmo"
    ]
  },
  {
    "id": "T190",
    "term": "PMOのコントロール型",
    "definition": "標準、方法論、コンプライアンス遵守を求め、一定の統制を行うPMO。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "Controlling＝中程度の統制。",
    "tags": [
      "pmo"
    ]
  },
  {
    "id": "T191",
    "term": "PMOの指揮型",
    "definition": "プロジェクトを直接管理し、PMを任命するなど高い統制を持つPMO。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "Directive＝高統制。",
    "tags": [
      "pmo"
    ]
  },
  {
    "id": "T192",
    "term": "ポートフォリオ",
    "definition": "戦略目標を達成するために一体的に管理される、プロジェクト、プログラム、サブポートフォリオ、運用の集合。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "構成要素が相互依存している必要はない。",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "T193",
    "term": "プログラム",
    "definition": "個別管理では得られない便益と統制を得るため、関連するプロジェクトや活動を協調管理するもの。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "関連性と共通便益がある。",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "T194",
    "term": "運用（Operations）",
    "definition": "製品・サービスを継続的に提供する定常的活動。プロジェクトは一時的だが、運用へ移管されることが多い。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "移行・引継ぎ計画が重要。",
    "tags": [
      "operations"
    ]
  },
  {
    "id": "T195",
    "term": "コンプライアンス",
    "definition": "法律、規制、契約、業界基準、組織方針などの要求事項を遵守すること。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "違反を発見したら隠さず、影響分析と定められた報告を行う。",
    "tags": [
      "compliance"
    ]
  },
  {
    "id": "T196",
    "term": "規制要求事項",
    "definition": "法令や監督機関によって課され、成果物やプロセスが満たす必要のある要求事項。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "優先順位で任意に外すことはできない。",
    "tags": [
      "compliance"
    ]
  },
  {
    "id": "T197",
    "term": "監査（Audit）",
    "definition": "活動、記録、プロセス、成果物が基準や要求事項に適合しているかを独立または体系的に確認すること。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "監査結果は是正と学習につなげる。",
    "tags": [
      "compliance"
    ]
  },
  {
    "id": "T198",
    "term": "是正措置",
    "definition": "実績を計画に戻すために行う意図的な活動。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "将来のパフォーマンスを整える。",
    "tags": [
      "change"
    ]
  },
  {
    "id": "T199",
    "term": "予防措置",
    "definition": "将来の逸脱や問題が発生する可能性を低減するために行う活動。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "既に起きた欠陥の修正とは異なる。",
    "tags": [
      "change"
    ]
  },
  {
    "id": "T200",
    "term": "欠陥修正",
    "definition": "不適合な成果物または構成要素を、要求事項に適合させるため修正する活動。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "変更要求として扱われることがある。",
    "tags": [
      "change"
    ]
  },
  {
    "id": "T201",
    "term": "組織変革マネジメント",
    "definition": "新しいプロセス、技術、役割、行動が定着するよう、影響分析、関与、教育、抵抗対応、定着化を行う活動。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "システム導入＝変革完了ではない。",
    "tags": [
      "change"
    ]
  },
  {
    "id": "T202",
    "term": "変革への抵抗",
    "definition": "不安、損失感、理解不足、過去経験、能力不足などから、新しい状態への移行を避けようとする反応。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "抵抗者を排除せず、原因を理解して関与する。",
    "tags": [
      "change"
    ]
  },
  {
    "id": "T203",
    "term": "変革影響評価",
    "definition": "変化が人、プロセス、技術、組織構造、文化、顧客、運用に与える影響を分析すること。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "影響の大きい層に合わせて支援を設計する。",
    "tags": [
      "change"
    ]
  },
  {
    "id": "T204",
    "term": "ADKARモデル",
    "definition": "変革を認知、願望、知識、能力、定着の5要素で捉える個人変革モデル。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "どの段階で止まっているかを診断する。",
    "tags": [
      "change"
    ]
  },
  {
    "id": "T205",
    "term": "サステナビリティ",
    "definition": "現在の価値を生みながら、環境・社会・経済への長期的影響と将来世代のニーズを考慮すること。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "コストだけでなくライフサイクル全体の影響を見る。",
    "tags": [
      "sustainability"
    ]
  },
  {
    "id": "T206",
    "term": "トリプル・ボトムライン",
    "definition": "成果を経済、環境、社会の3側面から評価する考え方。People、Planet、Profitとも表現される。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "短期利益だけで判断しない。",
    "tags": [
      "sustainability"
    ]
  },
  {
    "id": "T207",
    "term": "ライフサイクル・アセスメント",
    "definition": "製品やサービスの原材料調達から製造、利用、廃棄までの環境影響を評価する方法。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "プロジェクト終了時点だけを見ない。",
    "tags": [
      "sustainability"
    ]
  },
  {
    "id": "T208",
    "term": "ESG",
    "definition": "環境、社会、ガバナンスの観点から、組織や投資の持続可能性と責任ある行動を評価する枠組み。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "プロジェクトの制約・価値基準になり得る。",
    "tags": [
      "sustainability"
    ]
  },
  {
    "id": "T209",
    "term": "外部事業環境要因（EEF）",
    "definition": "市場、法規制、文化、組織構造、インフラ、政治、技術など、プロジェクトに影響し通常は直接制御できない条件。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "組織内部の要因も含まれる。",
    "tags": [
      "environment"
    ]
  },
  {
    "id": "T210",
    "term": "組織のプロセス資産（OPA）",
    "definition": "方針、手順、テンプレート、過去情報、教訓、知識ベースなど、組織が保有しプロジェクトで活用できる資産。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "EEFとの違いを押さえる。",
    "tags": [
      "environment"
    ]
  },
  {
    "id": "T211",
    "term": "市場変化",
    "definition": "顧客需要、競争、価格、供給、技術などの変動。ビジネスケースや優先順位の再評価を必要にする。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "計画に固執せず価値への影響を確認する。",
    "tags": [
      "environment"
    ]
  },
  {
    "id": "T212",
    "term": "地政学的リスク",
    "definition": "政治対立、制裁、紛争、貿易規制、国境・通貨の変動などがプロジェクトへ及ぼすリスク。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "サプライチェーンやデータ移転にも影響する。",
    "tags": [
      "environment"
    ]
  },
  {
    "id": "T213",
    "term": "事業継続性",
    "definition": "災害、障害、危機が発生しても、重要な製品・サービス・業務を許容水準で継続・復旧する能力。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "プロジェクト成果の運用継続性を考慮する。",
    "tags": [
      "risk"
    ]
  },
  {
    "id": "T214",
    "term": "レジリエンス",
    "definition": "変化、障害、危機に適応し、回復し、必要に応じてより良い状態へ変化する能力。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "単なる元通りではなく適応も含む。",
    "tags": [
      "risk"
    ]
  },
  {
    "id": "T215",
    "term": "データ・ガバナンス",
    "definition": "データの所有権、品質、アクセス、保護、保存、利用、説明責任を定める枠組み。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "AI活用の前提にもなる。",
    "tags": [
      "data"
    ]
  },
  {
    "id": "T216",
    "term": "データ・プライバシー",
    "definition": "個人データの収集、利用、共有、保存、削除を、法令と本人の権利に沿って管理すること。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "便利さを理由に無断利用しない。",
    "tags": [
      "data"
    ]
  },
  {
    "id": "T217",
    "term": "情報セキュリティ",
    "definition": "情報の機密性、完全性、可用性を保護し、脅威と脆弱性を管理すること。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "リスクベースで対策を選ぶ。",
    "tags": [
      "data"
    ]
  },
  {
    "id": "T218",
    "term": "生成AI（Generative AI）",
    "definition": "学習データに基づき、文章、画像、コード、分析案など新しい内容を生成するAI。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "出力を事実として無検証で採用しない。",
    "tags": [
      "ai"
    ]
  },
  {
    "id": "T219",
    "term": "AIバイアス",
    "definition": "学習データ、設計、利用方法の偏りにより、AIの出力が特定の集団や選択肢に不公平な影響を与えること。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "代表性、公平性、影響を人が検証する。",
    "tags": [
      "ai"
    ]
  },
  {
    "id": "T220",
    "term": "AIハルシネーション",
    "definition": "AIが事実に基づかない情報を、もっともらしく生成する現象。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "一次情報、専門家、データで検証する。",
    "tags": [
      "ai"
    ]
  },
  {
    "id": "T221",
    "term": "ヒューマン・イン・ザ・ループ",
    "definition": "AIの判断や生成結果に、人間が監督、検証、承認、介入できる仕組み。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "高影響の意思決定ほど人間の説明責任が重要。",
    "tags": [
      "ai"
    ]
  },
  {
    "id": "T222",
    "term": "説明可能性（Explainability）",
    "definition": "AIや分析の判断根拠を、関係者が理解・検証できる形で示せる性質。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "ブラックボックスのまま重要判断に使わない。",
    "tags": [
      "ai"
    ]
  },
  {
    "id": "T223",
    "term": "責任あるAI",
    "definition": "公平性、透明性、安全性、プライバシー、説明責任、人間の監督を確保してAIを開発・利用する考え方。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "効率だけでなく影響と倫理を評価する。",
    "tags": [
      "ai"
    ]
  },
  {
    "id": "T224",
    "term": "AI利用ポリシー",
    "definition": "入力してよい情報、利用可能なツール、承認、検証、記録、知的財産、プライバシーなどを定める組織ルール。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "機密情報を公開AIへ入力しない。",
    "tags": [
      "ai"
    ]
  },
  {
    "id": "T225",
    "term": "AIによる意思決定支援",
    "definition": "予測、分類、要約、リスク検出などをAIで補助しつつ、最終判断と説明責任を人間が担う利用形態。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "AIはPMの責任を代替しない。",
    "tags": [
      "ai"
    ]
  },
  {
    "id": "T226",
    "term": "倫理的意思決定",
    "definition": "正直、責任、尊重、公正などの原則と、影響を受ける人々への結果を考慮して判断すること。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "違反を隠す、データを操作する選択肢は避ける。",
    "tags": [
      "ethics"
    ]
  },
  {
    "id": "T227",
    "term": "利益相反",
    "definition": "個人的利益や関係が、公正な職務判断に影響する、または影響すると見られる状況。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "開示し、定められた手順で管理する。",
    "tags": [
      "ethics"
    ]
  },
  {
    "id": "T228",
    "term": "調達の倫理",
    "definition": "公平な競争、機密保持、贈答・便宜の管理、利益相反回避など、調達で守るべき倫理原則。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "特定ベンダーへの不当な優遇を避ける。",
    "tags": [
      "ethics"
    ]
  },
  {
    "id": "T229",
    "term": "顧客中心性",
    "definition": "顧客の課題、期待、体験、成果を理解し、継続的なフィードバックを通じて価値を高める考え方。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "要求どおり作るだけでなく、必要な成果を確認する。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T230",
    "term": "成功基準",
    "definition": "プロジェクトや成果物が成功したと判断するための、合意された測定可能な条件。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "納期・予算だけでなく価値・便益・品質を含める。",
    "tags": [
      "value"
    ]
  },
  {
    "id": "T231",
    "term": "KPI（重要業績評価指標）",
    "definition": "戦略目標や成果への進捗を測定する重要な指標。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "core",
    "examTip": "測りやすさではなく、目標との因果関係を重視する。",
    "tags": [
      "measurement"
    ]
  },
  {
    "id": "T232",
    "term": "OKR",
    "definition": "達成したい定性的なObjectiveと、その達成を測る定量的なKey Resultsを組み合わせる目標管理方法。",
    "domain": "business",
    "approaches": [
      "common"
    ],
    "priority": "important",
    "examTip": "活動量ではなく成果をKey Resultsにする。",
    "tags": [
      "measurement"
    ]
  }
];

export const SCENARIOS: ScenarioQuestion[] = [
  {
    "id": "S001",
    "domain": "people",
    "approach": "common",
    "difficulty": "medium",
    "question": "経験豊富なメンバーが若手の意見を会議で繰り返し遮り、若手が発言しなくなった。PMが最初に行うべきことは何か。",
    "options": [
      "経験豊富なメンバーを直ちにチームから外す",
      "若手に個別で発言内容を提出させる",
      "当事者の話を聴き、グラウンドルールと心理的安全性を確認する",
      "スポンサーに処分を依頼する"
    ],
    "answer": 2,
    "explanation": "まず事実と背景を聴き、合意済みの行動ルールを使って安全な対話を回復します。即時の排除やエスカレーションは通常、最初の行動ではありません。",
    "tags": [
      "conflict",
      "team"
    ]
  },
  {
    "id": "S002",
    "domain": "people",
    "approach": "common",
    "difficulty": "medium",
    "question": "主要ステークホルダーが『必要な情報が届かない』と不満を表明した。コミュニケーション計画には週次メールが定められている。最適な対応は何か。",
    "options": [
      "計画どおりメールを送っているため変更しない",
      "相手の情報ニーズと希望チャネルを確認し、計画を適応する",
      "毎日すべての資料を送る",
      "スポンサーに対応を任せる"
    ],
    "answer": 1,
    "explanation": "計画の遵守自体が目的ではありません。受け手のニーズを確認し、価値あるコミュニケーションへ調整します。",
    "tags": [
      "communication",
      "stakeholder"
    ]
  },
  {
    "id": "S003",
    "domain": "people",
    "approach": "agile",
    "difficulty": "medium",
    "question": "自己組織化チームのメンバーが、次の作業をPMに割り当ててほしいと求めた。PMはどうするべきか。",
    "options": [
      "各人の専門性に基づき作業を割り当てる",
      "チームがスプリント・ゴールに沿って作業を選べるよう支援する",
      "最も速いメンバーにすべて任せる",
      "プロダクト・オーナーに割り当てさせる"
    ],
    "answer": 1,
    "explanation": "適応型環境ではチームの自己管理を支援します。PMやプロダクト・オーナーが個々の作業を割り当てるのは適切ではありません。",
    "tags": [
      "agile",
      "team"
    ]
  },
  {
    "id": "S004",
    "domain": "people",
    "approach": "common",
    "difficulty": "hard",
    "question": "二人の専門家が技術方針をめぐって強く対立している。両案とも長期的な影響が大きく、今日中の決定は不要である。最適な解決方法は何か。",
    "options": [
      "PMの権限で一方を選ぶ",
      "多数決で即決する",
      "根本的な関心とデータを共有し、協調／問題解決を行う",
      "対立が自然に消えるまで放置する"
    ],
    "answer": 2,
    "explanation": "重要で時間的余裕がある対立では、根本原因を扱う協調／問題解決が長期的な解決につながります。",
    "tags": [
      "conflict",
      "decision"
    ]
  },
  {
    "id": "S005",
    "domain": "people",
    "approach": "common",
    "difficulty": "medium",
    "question": "新任メンバーの能力不足により作業が遅れている。本人は学ぶ意欲が高い。PMがまず取るべき対応は何か。",
    "options": [
      "低い評価を付ける",
      "能力ギャップを確認し、トレーニングやコーチングを計画する",
      "作業を永久に他のメンバーへ移す",
      "スポンサーへ交代を依頼する"
    ],
    "answer": 1,
    "explanation": "まず原因を確認し、能力開発で解決できるかを検討します。交代や処分は早すぎます。",
    "tags": [
      "coaching",
      "team"
    ]
  },
  {
    "id": "S006",
    "domain": "people",
    "approach": "common",
    "difficulty": "medium",
    "question": "遠隔チームで誤解が頻発し、会議に参加しないメンバーもいる。最初に何を見直すべきか。",
    "options": [
      "全員を出社させる",
      "チーム憲章、時差、チャネル、会議規範をチームで見直す",
      "会議をすべて録画するだけにする",
      "欠席者をプロジェクトから外す"
    ],
    "answer": 1,
    "explanation": "バーチャルチームでは、時差や文化を含む協働ルールを明示的に合意し直すことが有効です。",
    "tags": [
      "virtual",
      "communication"
    ]
  },
  {
    "id": "S007",
    "domain": "people",
    "approach": "common",
    "difficulty": "hard",
    "question": "影響力の高い部門長が、承認済みの優先順位を変えるよう非公式に要求した。PMが最初に行うべきことは何か。",
    "options": [
      "要求どおり直ちに変更する",
      "要求を拒否して会話を終了する",
      "背景と期待価値を確認し、定められた意思決定・変更経路へ導く",
      "チームに秘密で作業を開始させる"
    ],
    "answer": 2,
    "explanation": "高い影響力を尊重しつつ、背景を理解し、ガバナンスと変更管理を守ります。",
    "tags": [
      "stakeholder",
      "governance"
    ]
  },
  {
    "id": "S008",
    "domain": "people",
    "approach": "common",
    "difficulty": "medium",
    "question": "チームが優れた成果を出した。PMが報奨を検討する際に最も重要なことは何か。",
    "options": [
      "全員に同じ金額を必ず支給する",
      "PMが好む方法で即決する",
      "文化・個人差・貢献・組織方針を踏まえ、適時に認識する",
      "次のプロジェクト終了まで待つ"
    ],
    "answer": 2,
    "explanation": "認識と報奨は、公平性、文化、本人の価値観、組織方針を踏まえ、行動との関連が分かる時期に行います。",
    "tags": [
      "motivation",
      "ethics"
    ]
  },
  {
    "id": "S009",
    "domain": "people",
    "approach": "common",
    "difficulty": "hard",
    "question": "会議で少数派の重要なリスク懸念が、多数決により却下された。PMはどうするべきか。",
    "options": [
      "多数決なので何もしない",
      "少数派を会議から外す",
      "懸念の根拠と影響を検討し、必要ならリスクとして記録・分析する",
      "スポンサーに多数決を無効にさせる"
    ],
    "answer": 2,
    "explanation": "多数決はリスクを消しません。重要な根拠があれば、意思決定とは別に適切なリスク管理を行います。",
    "tags": [
      "decision",
      "risk"
    ]
  },
  {
    "id": "S010",
    "domain": "people",
    "approach": "common",
    "difficulty": "medium",
    "question": "スポンサーとチームが成功の意味について異なる認識を持っている。PMが行うべきことは何か。",
    "options": [
      "納期だけを成功基準とする",
      "両者と成功基準・価値・測定方法を明確化し合意する",
      "スポンサーの定義だけを採用する",
      "終結時まで判断を延期する"
    ],
    "answer": 1,
    "explanation": "早期に成功基準を合意し、成果・価値・品質・制約を測定可能にします。",
    "tags": [
      "alignment",
      "value"
    ]
  },
  {
    "id": "S011",
    "domain": "people",
    "approach": "common",
    "difficulty": "hard",
    "question": "メンバーが機密情報の誤送信をPMへ報告した。本人は評価への影響を恐れ、内密に処理してほしいと求めている。PMの対応は何か。",
    "options": [
      "本人を守るため記録しない",
      "直ちに全社へ公開する",
      "事実を保全し、セキュリティ・コンプライアンス手順に従って報告・封じ込める",
      "メールを削除すれば完了とする"
    ],
    "answer": 2,
    "explanation": "心理的安全性を保ちつつ、機密性事故は定められた手順で扱います。隠蔽は倫理・法令上のリスクを高めます。",
    "tags": [
      "ethics",
      "security"
    ]
  },
  {
    "id": "S012",
    "domain": "people",
    "approach": "hybrid",
    "difficulty": "medium",
    "question": "予測型部門とアジャイルチームの間で、進捗報告の形式をめぐる摩擦が続いている。最善の対応は何か。",
    "options": [
      "一方の方法を強制する",
      "両者の意思決定に必要な情報を確認し、共通の指標と報告方法を合意する",
      "報告を廃止する",
      "PMが毎回手作業で異なる数字を作る"
    ],
    "answer": 1,
    "explanation": "方法論の優劣ではなく、利用目的と情報ニーズを共通理解に変換します。",
    "tags": [
      "hybrid",
      "communication"
    ]
  },
  {
    "id": "S013",
    "domain": "people",
    "approach": "common",
    "difficulty": "medium",
    "question": "ステークホルダー分析で、権力は高いが関心は低い人物が特定された。一般的な関与方針はどれか。",
    "options": [
      "常に詳細管理する",
      "満足を維持し、必要な意思決定に関与させる",
      "完全に無視する",
      "毎時間進捗を報告する"
    ],
    "answer": 1,
    "explanation": "パワー／関心度グリッドでは、高権力・低関心は一般に『満足を保つ』対象です。",
    "tags": [
      "stakeholder"
    ]
  },
  {
    "id": "S014",
    "domain": "people",
    "approach": "common",
    "difficulty": "hard",
    "question": "多文化チームで沈黙が同意と解釈され、後から反対意見が出た。PMはどう改善するべきか。",
    "options": [
      "沈黙した人の責任とする",
      "文化差を確認し、ラウンドロビンや匿名投票など複数の発言方法を設ける",
      "英語が得意な人だけで決める",
      "すべて多数決にする"
    ],
    "answer": 1,
    "explanation": "文化的認識と包摂的なファシリテーションにより、発言スタイルの違いを吸収します。",
    "tags": [
      "diversity",
      "facilitation"
    ]
  },
  {
    "id": "S015",
    "domain": "people",
    "approach": "common",
    "difficulty": "medium",
    "question": "PMの権限を超える法的判断が必要になった。最適な対応は何か。",
    "options": [
      "PMが独自判断する",
      "判断を先送りする",
      "影響と選択肢を整理し、定められたガバナンス経路へエスカレーションする",
      "チームの多数決で決める"
    ],
    "answer": 2,
    "explanation": "権限境界を超える事項は、情報を整理したうえで適切な意思決定者へ上げます。",
    "tags": [
      "escalation",
      "governance"
    ]
  },
  {
    "id": "S016",
    "domain": "process",
    "approach": "predictive",
    "difficulty": "medium",
    "question": "承認済みベースラインに影響する変更要求が顧客から届いた。PMが最初に行うべきことは何か。",
    "options": [
      "チームへ直ちに実装を指示する",
      "要求を記録し、影響を分析して統合変更管理へ提出する",
      "顧客要求なので無条件に承認する",
      "次回の教訓登録簿だけに記録する"
    ],
    "answer": 1,
    "explanation": "予測型では、変更を実装する前に記録、影響分析、承認経路を通します。",
    "tags": [
      "change"
    ]
  },
  {
    "id": "S017",
    "domain": "process",
    "approach": "predictive",
    "difficulty": "medium",
    "question": "プロジェクトが期限に遅れそうで、追加予算は利用可能である。品質を下げずに期間短縮を検討したい。まず分析すべき対象は何か。",
    "options": [
      "すべてのアクティビティ",
      "クリティカル・パス上の短縮可能なアクティビティ",
      "最も安いアクティビティ",
      "完了済みアクティビティ"
    ],
    "answer": 1,
    "explanation": "クラッシングやファスト・トラッキングは、まずクリティカル・パスに効く作業を対象にします。",
    "tags": [
      "schedule"
    ]
  },
  {
    "id": "S018",
    "domain": "process",
    "approach": "predictive",
    "difficulty": "hard",
    "question": "BAC=1,000、EV=400、AC=500で、現在のコスト効率が今後も続くと見込む。EACはいくらか。",
    "options": [
      "800",
      "1,100",
      "1,250",
      "1,500"
    ],
    "answer": 2,
    "explanation": "CPI=400/500=0.8。効率が継続する場合、EAC=BAC/CPI=1,000/0.8=1,250です。",
    "tags": [
      "evm"
    ]
  },
  {
    "id": "S019",
    "domain": "process",
    "approach": "predictive",
    "difficulty": "medium",
    "question": "特定済みリスクへの対応費用として、コスト・ベースライン内に予算を確保した。この予備は何か。",
    "options": [
      "マネジメント予備",
      "コンティンジェンシー予備",
      "利益準備金",
      "運用予算"
    ],
    "answer": 1,
    "explanation": "特定済みリスク、すなわち既知の未知に対する予備はコンティンジェンシー予備です。",
    "tags": [
      "risk",
      "cost"
    ]
  },
  {
    "id": "S020",
    "domain": "process",
    "approach": "agile",
    "difficulty": "medium",
    "question": "スプリント中に重要な新要求が判明した。現在のスプリント・ゴールは引き続き有効である。適切な対応は何か。",
    "options": [
      "直ちにスプリントへ追加する",
      "プロダクト・オーナーと開発者が影響を協議し、ゴールを守りつつバックログを適応する",
      "スプリントを自動的に中止する",
      "要求を永久に拒否する"
    ],
    "answer": 1,
    "explanation": "スプリント・ゴールを危険にさらさない範囲でスコープを明確化・再交渉し、新要求はバックログで順序付けします。",
    "tags": [
      "scrum",
      "change"
    ]
  },
  {
    "id": "S021",
    "domain": "process",
    "approach": "agile",
    "difficulty": "medium",
    "question": "デイリー・スクラムがPMへの進捗報告会になり、30分を超えている。改善策は何か。",
    "options": [
      "PMが全員へ詳細質問する",
      "開発者がスプリント・ゴールへの進捗を検査し、次の計画を適応する15分の場へ戻す",
      "週1回に減らす",
      "スポンサーを毎日参加させる"
    ],
    "answer": 1,
    "explanation": "デイリー・スクラムは開発者の計画適応のためのイベントで、管理者への報告会ではありません。",
    "tags": [
      "scrum"
    ]
  },
  {
    "id": "S022",
    "domain": "process",
    "approach": "agile",
    "difficulty": "hard",
    "question": "カンバンボードのテスト列に作業が滞留している一方、開発者は新規作業を次々開始している。最善の行動は何か。",
    "options": [
      "開発列のWIP上限を増やす",
      "新規着手を抑え、チームでテスト列のボトルネック解消を支援する",
      "テスト列を非表示にする",
      "完了基準を緩める"
    ],
    "answer": 1,
    "explanation": "WIPを制限し、開始より完了を優先してフロー全体を改善します。",
    "tags": [
      "flow",
      "kanban"
    ]
  },
  {
    "id": "S023",
    "domain": "process",
    "approach": "hybrid",
    "difficulty": "medium",
    "question": "ハードウェアは要求が安定しているが、利用者向けソフトウェアはフィードバックを受けながら作る必要がある。適切な開発アプローチは何か。",
    "options": [
      "全体を必ず予測型にする",
      "全体を必ずアジャイルにする",
      "ハードウェアは予測型、ソフトウェアは適応型とするハイブリッド",
      "計画を作らない"
    ],
    "answer": 2,
    "explanation": "成果物の特性に応じてアプローチを意図的に組み合わせます。",
    "tags": [
      "lifecycle",
      "hybrid"
    ]
  },
  {
    "id": "S024",
    "domain": "process",
    "approach": "common",
    "difficulty": "medium",
    "question": "受け入れ基準を満たした成果物を顧客が主観的理由で拒否した。PMが最初に行うべきことは何か。",
    "options": [
      "顧客を無視して終結する",
      "合意済み要求事項、受け入れ基準、検証結果を顧客と確認する",
      "チームへ無償で全面再作成させる",
      "法的措置を直ちに取る"
    ],
    "answer": 1,
    "explanation": "まず客観的な合意事項と検証結果を確認し、認識差や不足を明らかにします。",
    "tags": [
      "scope",
      "quality"
    ]
  },
  {
    "id": "S025",
    "domain": "process",
    "approach": "common",
    "difficulty": "medium",
    "question": "同じ種類の欠陥が繰り返し発生している。最も適切な次の行動は何か。",
    "options": [
      "欠陥を毎回修正するだけにする",
      "根本原因分析を行い、プロセス改善と再発防止策を実施する",
      "検査をやめる",
      "品質基準を下げる"
    ],
    "answer": 1,
    "explanation": "繰り返す問題には、症状修正だけでなく根本原因とシステム改善が必要です。",
    "tags": [
      "quality"
    ]
  },
  {
    "id": "S026",
    "domain": "process",
    "approach": "predictive",
    "difficulty": "hard",
    "question": "納期を守るため、順番に予定していた二つの設計作業を一部並行化する案が出た。この技法と主な影響は何か。",
    "options": [
      "クラッシング、コストのみ増える",
      "ファスト・トラッキング、手戻りリスクが増える",
      "資源平滑化、品質が必ず上がる",
      "ローリング・ウェーブ、契約リスクが消える"
    ],
    "answer": 1,
    "explanation": "順次作業の並行化はファスト・トラッキングで、依存情報が未確定のため手戻りリスクが増えます。",
    "tags": [
      "schedule"
    ]
  },
  {
    "id": "S027",
    "domain": "process",
    "approach": "common",
    "difficulty": "medium",
    "question": "新しい規制要求が判明し、スコープへの影響が不明である。最初に行うべきことは何か。",
    "options": [
      "無視する",
      "要求事項と適用性を確認し、影響分析を行う",
      "直ちにすべての作業を中止する",
      "顧客に責任を移す"
    ],
    "answer": 1,
    "explanation": "適用性と影響を確認したうえで、リスク・変更・コンプライアンスの手順へつなげます。",
    "tags": [
      "requirements",
      "compliance"
    ]
  },
  {
    "id": "S028",
    "domain": "process",
    "approach": "agile",
    "difficulty": "medium",
    "question": "プロダクト・バックログの上位項目が大きすぎて、次のスプリントで完成できない。適切な対応は何か。",
    "options": [
      "そのまま着手する",
      "価値のある小さな項目へ分割し、受け入れ基準と順序を明確にする",
      "見積りを小さく書き換える",
      "完了の定義を外す"
    ],
    "answer": 1,
    "explanation": "大きな項目は価値を保ちながら分割し、短いフィードバックを可能にします。",
    "tags": [
      "backlog",
      "agile"
    ]
  },
  {
    "id": "S029",
    "domain": "process",
    "approach": "common",
    "difficulty": "hard",
    "question": "プロジェクトの不確実性が非常に高く、主要な技術選択の実現可能性が不明である。大規模実装の前に行うべきことは何か。",
    "options": [
      "最も高価な技術を選ぶ",
      "時間制限付きのスパイクやプロトタイプで仮説を検証する",
      "詳細計画だけを増やす",
      "問題が起きるまで待つ"
    ],
    "answer": 1,
    "explanation": "高い技術的不確実性は、小さな実験で早期に学習し、リスクを低減します。",
    "tags": [
      "uncertainty",
      "agile"
    ]
  },
  {
    "id": "S030",
    "domain": "process",
    "approach": "common",
    "difficulty": "medium",
    "question": "プロジェクト終結前に運用部門が成果物を受け取る準備ができていない。PMが優先すべきことは何か。",
    "options": [
      "成果物を置いてプロジェクトを閉じる",
      "移行基準、研修、文書、支援、受入責任を確認し、移行計画を実行する",
      "運用部門を責める",
      "プロジェクトチームを即解散する"
    ],
    "answer": 1,
    "explanation": "価値提供には運用への円滑な移行が必要です。引継ぎ、知識移転、受入準備を確認します。",
    "tags": [
      "transition",
      "operations"
    ]
  },
  {
    "id": "S031",
    "domain": "process",
    "approach": "predictive",
    "difficulty": "hard",
    "question": "EV=600、PV=750、AC=500である。正しい解釈はどれか。",
    "options": [
      "予定より進み、予算超過",
      "予定より遅れ、コスト効率は良い",
      "予定より進み、コスト効率も良い",
      "予定より遅れ、予算超過"
    ],
    "answer": 1,
    "explanation": "SV=600-750=-150で遅延。CPI=600/500=1.2でコスト効率は良好です。",
    "tags": [
      "evm"
    ]
  },
  {
    "id": "S032",
    "domain": "process",
    "approach": "common",
    "difficulty": "medium",
    "question": "プロジェクトの目的に関係しないが魅力的な機能をチームが追加しようとしている。PMはどうするべきか。",
    "options": [
      "創造性を重視して無条件で追加する",
      "価値、要求事項、優先順位、変更手順を確認し、ゴールド・プレーティングを防ぐ",
      "顧客に知らせず追加する",
      "予備費で実装する"
    ],
    "answer": 1,
    "explanation": "承認されていない機能追加は品質向上とは限らず、リスクや保守コストを増やします。",
    "tags": [
      "scope",
      "value"
    ]
  },
  {
    "id": "S033",
    "domain": "process",
    "approach": "common",
    "difficulty": "hard",
    "question": "リスク対応を実施した結果、新しいリスクが生じた。このリスクは何と呼ばれ、どう扱うか。",
    "options": [
      "残存リスク。無視する",
      "二次リスク。特定・分析・対応を計画する",
      "未知の未知。必ずスポンサーへ移す",
      "課題。記録しない"
    ],
    "answer": 1,
    "explanation": "対応によって新たに生じたリスクは二次リスクで、通常のリスク管理対象です。",
    "tags": [
      "risk"
    ]
  },
  {
    "id": "S034",
    "domain": "business",
    "approach": "common",
    "difficulty": "hard",
    "question": "市場変化により、完成予定の製品が組織戦略に合わず、便益も大幅に低下すると判明した。PMが最初に行うべきことは何か。",
    "options": [
      "計画どおり完成させる",
      "ビジネスケース、便益、選択肢への影響を分析し、ガバナンス機関へ判断材料を提示する",
      "チームだけで中止する",
      "事実を隠す"
    ],
    "answer": 1,
    "explanation": "プロジェクト継続自体が目的ではありません。価値と戦略整合性を再評価し、権限ある機関が継続・変更・中止を判断します。",
    "tags": [
      "value",
      "strategy"
    ]
  },
  {
    "id": "S035",
    "domain": "business",
    "approach": "common",
    "difficulty": "hard",
    "question": "生成AIが作成したリスク分析に、存在しない規制の引用が含まれていた。PMの対応は何か。",
    "options": [
      "AIの出力なので採用する",
      "引用を削除してそのまま使う",
      "一次情報と専門家で検証し、AI利用・データ品質の統制を改善する",
      "AIを永久に禁止する"
    ],
    "answer": 2,
    "explanation": "AIハルシネーションを前提に、人間の検証、出典確認、説明責任を確保します。",
    "tags": [
      "ai",
      "compliance"
    ]
  },
  {
    "id": "S036",
    "domain": "business",
    "approach": "common",
    "difficulty": "medium",
    "question": "チームが公開型AIサービスへ顧客の機密データを入力しようとしている。PMが取るべき行動は何か。",
    "options": [
      "効率が上がるので許可する",
      "データを少しだけ減らして入力する",
      "利用を止め、組織のAI・プライバシー・セキュリティ方針を確認する",
      "入力後に顧客へ報告する"
    ],
    "answer": 2,
    "explanation": "機密情報の外部入力は、承認、契約、法令、データ・ガバナンスを確認する前に行ってはいけません。",
    "tags": [
      "ai",
      "privacy"
    ]
  },
  {
    "id": "S037",
    "domain": "business",
    "approach": "common",
    "difficulty": "hard",
    "question": "AIモデルの提案が特定地域の応募者を一貫して低く評価している。最適な対応は何か。",
    "options": [
      "効率が高いので採用する",
      "評価結果だけを手作業で上げる",
      "利用を一時停止し、データとモデルのバイアス、影響、公平性を専門家と検証する",
      "地域情報を非表示にすれば必ず解決する"
    ],
    "answer": 2,
    "explanation": "高影響な判断では、バイアス評価、人間の監督、透明性、是正、影響を受ける人への配慮が必要です。",
    "tags": [
      "ai",
      "ethics"
    ]
  },
  {
    "id": "S038",
    "domain": "business",
    "approach": "common",
    "difficulty": "medium",
    "question": "新システムを納品したが、利用者が旧手順を使い続け、期待便益が出ていない。次に重視すべきことは何か。",
    "options": [
      "納品済みなので何もしない",
      "変革影響、抵抗要因、教育、支援、定着指標を確認する",
      "利用者を処分する",
      "機能を増やす"
    ],
    "answer": 1,
    "explanation": "アウトプットの納品だけでなく、採用・行動変容・アウトカムを支援して便益を実現します。",
    "tags": [
      "change",
      "benefits"
    ]
  },
  {
    "id": "S039",
    "domain": "business",
    "approach": "common",
    "difficulty": "medium",
    "question": "法令遵守に必要な機能が、顧客価値が低いという理由でバックログ下位に置かれた。適切な対応は何か。",
    "options": [
      "顧客価値が低いので後回しにする",
      "適用法令と期限を確認し、必須制約として優先順位と計画へ反映する",
      "法務部門にだけ任せる",
      "リリース後に考える"
    ],
    "answer": 1,
    "explanation": "法令・規制は任意の機能とは異なり、適用性と期限を満たす必要があります。",
    "tags": [
      "compliance",
      "prioritization"
    ]
  },
  {
    "id": "S040",
    "domain": "business",
    "approach": "common",
    "difficulty": "hard",
    "question": "低価格の材料へ変更すれば初期費用は下がるが、廃棄物と運用時のエネルギー消費が大幅に増える。どの評価が適切か。",
    "options": [
      "初期費用だけで決める",
      "ライフサイクル全体の経済・環境・社会影響を比較する",
      "環境影響はプロジェクト外として無視する",
      "最も早く調達できるものを選ぶ"
    ],
    "answer": 1,
    "explanation": "サステナビリティでは、調達価格だけでなく、利用・保守・廃棄までの総影響と価値を評価します。",
    "tags": [
      "sustainability",
      "procurement"
    ]
  },
  {
    "id": "S041",
    "domain": "business",
    "approach": "common",
    "difficulty": "medium",
    "question": "プロジェクト成果は納期・予算内で完成したが、顧客利用率が目標の20%に留まった。成功評価として最も適切なものは何か。",
    "options": [
      "納期・予算内なので完全成功",
      "成果物は完成したが、アウトカムと便益は未達の可能性がある",
      "顧客利用率はプロジェクトと無関係",
      "チームの残業時間だけで評価する"
    ],
    "answer": 1,
    "explanation": "新試験では成果物だけでなく、アウトカム、便益、価値を重視します。",
    "tags": [
      "value",
      "benefits"
    ]
  },
  {
    "id": "S042",
    "domain": "business",
    "approach": "common",
    "difficulty": "hard",
    "question": "PMがベンダー選定委員会に参加している。候補企業の一社がPMの親族企業だと判明した。どうするべきか。",
    "options": [
      "最も良い提案なら開示不要",
      "関係を開示し、組織の利益相反手順に従い、必要なら評価から外れる",
      "親族企業を自動的に選ぶ",
      "他候補にだけ伝える"
    ],
    "answer": 1,
    "explanation": "実際の偏りだけでなく、偏りと見られる状況も開示・管理します。",
    "tags": [
      "ethics",
      "procurement"
    ]
  },
  {
    "id": "S043",
    "domain": "business",
    "approach": "common",
    "difficulty": "medium",
    "question": "災害により主要拠点が利用できなくなった。プロジェクトがまず参照すべきものは何か。",
    "options": [
      "個人の経験だけ",
      "事業継続・危機対応計画と定められた連絡・復旧手順",
      "通常の週次報告書",
      "教訓登録簿だけ"
    ],
    "answer": 1,
    "explanation": "危機時は承認済みの事業継続性・緊急対応・連絡経路を発動し、安全と重要業務を優先します。",
    "tags": [
      "resilience",
      "operations"
    ]
  },
  {
    "id": "S044",
    "domain": "business",
    "approach": "common",
    "difficulty": "hard",
    "question": "外部監査で重大な不適合が見つかった。経営層は製品発表まで報告を遅らせるよう求めた。PMはどうするべきか。",
    "options": [
      "指示どおり隠す",
      "監査記録を削除する",
      "事実を記録し、法令・倫理・ガバナンス上の報告経路に従う",
      "チームへ口外禁止を命じる"
    ],
    "answer": 2,
    "explanation": "PMは正直さ、責任、コンプライアンスを優先します。不適合の隠蔽は選択肢になりません。",
    "tags": [
      "compliance",
      "ethics"
    ]
  },
  {
    "id": "S045",
    "domain": "business",
    "approach": "common",
    "difficulty": "medium",
    "question": "プロジェクトのKPIが『会議回数』と『作成文書数』だけで、顧客価値との関連が見えない。改善策は何か。",
    "options": [
      "活動量をさらに増やす",
      "戦略目標、アウトカム、便益と結び付く指標へ見直す",
      "測定をすべてやめる",
      "報告書のページ数をKPIにする"
    ],
    "answer": 1,
    "explanation": "KPIは測りやすい活動量ではなく、目標と価値への進捗を示す必要があります。",
    "tags": [
      "measurement",
      "value"
    ]
  }
];
