## Typescript 実行環境

```
npm init -y
npm install typescript ts-node-dev
npx tsc --init
```

[ts-node と ts-node-dev の違い](https://qiita.com/sa9ra4ma/items/67ab5ac6fea3e5f065b0)

> npm install typescript ts-node-dev

```
"scripts": {
  "ts-node-dev": "ts-node-dev --respawn src/index.ts"
},
```

## Typescript の型

[【TypeScript】Generics(ジェネリックス)を理解する](https://qiita.com/k-penguin-sato/items/9baa959e8919157afcd4)
[ジェネリクス](https://future-architect.github.io/typescript-guide/generics.html)

> any や unknown の変数に値を設定してしまうと、型情報がリセットされます。取り出すときに、適切な型を宣言してあげないと、その後のエラーチェックが無効になったり、エディタの補完ができません。

[TypeScript: ジェネリック関数の型パラメータを書く位置は、引数カッコの直前](https://qiita.com/suin/items/fa7184b9bc916ef5a6ac)

> どんな関数の書き方であっても、型パラメータ<T>は、仮引数のカッコの前に書けば良い。

```
<T> (value: T) => {} // アロー関数

function f<T>(value: T) {} // 関数
```

[is で型を絞り込み(ユーザ定義型ガード)](https://www.wakuwakubank.com/posts/767-typescript-user-defined-type-guards/)

> is 演算子は、User-Defined Type Guards(ユーザ定義型ガード)と呼ばれる機能で使われて、型を絞り込みたいシーンで活用できます。

## Result 型

[TypeScript で Result 型でのエラーハンドリングを通してモナドの世界を覗いてみる](https://qiita.com/shimopino/items/d194957599dd45e91a5f)

## Jest の導入

[TypeScript のテストを Jest (ts-jest) でやってみる](https://qiita.com/mangano-ito/items/99dedf88d972e7e631b7)

```
npm install --save-dev jest ts-jest @types/jest
```

```json (package.json)
{
  "jest": {
    "moduleFileExtensions": ["ts", "js"],
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "globals": {
      "ts-jest": {
        "tsConfig": "tsconfig.json"
      }
    },
    "testMatch": ["**/tests/**/*.test.ts"]
  }
}
```
