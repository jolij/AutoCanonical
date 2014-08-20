# Auto Canonical

これはアドレスバーのURLを自動的にcanonical urlに変更するChrome拡張です。

- ページに`link[rel=canonical]`が設定されている場合は、そのURLに変更します。
- それがなくても、不要なパラメータがついている場合はそれを削除したURLに変更します。
    - どのパラメータを不要と判断しているかは`content.js`を見てください。
- `history.replaceState`を使っているのでページの再読み込みは発生しません。
    - canonical urlのOriginが現在のページと異なる場合は機能しません。

## Install

Install from Chrome Web Store "[Auto Canonical](https://chrome.google.com/webstore/detail/canonicaurl/dcbmeicnoejpldipejlefojiiebhogij)".
