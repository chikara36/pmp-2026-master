# PMP 2026 Master

2026年7月9日開始のPMP新試験向けに再設計した、React + TypeScript + Tailwind CSS製の非公式学習アプリです。

## 主な機能

- 公式ドメイン比率：People 33%、Process 41%、Business Environment 26%
- 用語232語
- 解説付きシナリオ問題45問
- 60問短縮模試／180問・240分模試
- 予測型・アジャイル・ハイブリッドをドメインとは別軸で管理
- AI、サステナビリティ、価値、組織変革、コンプライアンスを追加
- 用語検索、習熟度フィルター、ドメイン別正答率
- `localStorage`による学習履歴保存
- 80%をアプリ内マスタリー基準として明示

## 起動

```bash
npm install
npm run dev
```

本番ビルド：

```bash
npm run build
```

## 既存プロジェクトへ組み込む場合

`src/App.tsx` と `src/pmp2026Data.ts` を既存のReact/Tailwindプロジェクトへコピーしてください。  
`lucide-react`が必要です。

```bash
npm install lucide-react
```

## 注意

- PMI、PMP、PMBOKはProject Management Institute, Inc.の登録商標です。
- 本アプリはPMIによる承認・認定・提供を受けたものではありません。
- 80%は本アプリ独自の学習基準であり、PMP本試験の公式合格点ではありません。
- 公開前に、利用するPMI資料・商標・引用に関する最新の利用条件を確認してください。

## GitHub + Vercelで公開

1. このフォルダをGitHubリポジトリへpushします。
2. Vercelで **Add New → Project** を開き、GitHubリポジトリをImportします。
3. 通常はViteとして自動認識されます。必要な場合は次を設定してください。
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. `Deploy`を実行します。

現状は環境変数を使用していません。学習履歴はブラウザの`localStorage`に保存されるため、端末・ブラウザ間では同期されません。
