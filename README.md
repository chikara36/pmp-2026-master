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

## GitHub Pagesで公開

このリポジトリはGitHub Pages用の自動デプロイ設定を含んでいます。

1. GitHubのリポジトリ画面で **Settings → Pages** を開きます。
2. **Build and deployment** の **Source** を **GitHub Actions** にします。
3. `main`ブランチにpushすると、`.github/workflows/deploy-pages.yml` が自動実行されます。
4. 公開URLは通常、次の形式になります。

```text
https://chikara36.github.io/pmp-2026-master/
```

Viteの`base`は、GitHub Actions実行時のみ `/pmp-2026-master/` になるように設定しています。ローカル開発やVercelでは `/` のまま動きます。

## GitHub + Vercelで公開

Vercelで公開する場合もそのまま利用できます。

1. このフォルダをGitHubリポジトリへpushします。
2. Vercelで **Add New → Project** を開き、GitHubリポジトリをImportします。
3. 通常はViteとして自動認識されます。必要な場合は次を設定してください。
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. `Deploy`を実行します。

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
- 学習履歴はブラウザの`localStorage`に保存されるため、端末・ブラウザ間では同期されません。
