// 世界100カ国の国名と通貨コードの対応表（例）
const countryToCurrency = {
    "日本": "JPY",
    "アメリカ合衆国": "USD",
    "カナダ": "CAD",
    "オーストラリア": "AUD",
    "イギリス": "GBP",
    "フランス": "EUR",
    "ドイツ": "EUR",
    "イタリア": "EUR",
    "スペイン": "EUR",
    "中国": "CNY",
    "インド": "INR",
    "韓国": "KRW",
    "ブラジル": "BRL",
    "メキシコ": "MXN",
    "ロシア": "RUB",
    "南アフリカ": "ZAR",
    "スイス": "CHF",
    "スウェーデン": "SEK",
    "オランダ": "EUR",
    "サウジアラビア": "SAR",
    "アラブ首長国連邦": "AED",
    "トルコ": "TRY",
    "アルゼンチン": "ARS",
    "インドネシア": "IDR",
    "タイ": "THB",
    "マレーシア": "MYR",
    "シンガポール": "SGD",
    "ベトナム": "VND",
    "フィリピン": "PHP",
    "クウェート": "KWD",
    "カタール": "QAR",
    "ニュージーランド": "NZD",
    "ナイジェリア": "NGN",
    "エジプト": "EGP",
    "モロッコ": "MAD",
    "ペルー": "PEN",
    "チリ": "CLP",
    "コロンビア": "COP",
    "パキスタン": "PKR",
    "バングラデシュ": "BDT",
    "ウクライナ": "UAH",
    "ベラルーシ": "BYN",
    "ポーランド": "PLN",
    "ルーマニア": "RON",
    "ブルガリア": "BGN",
    "ハンガリー": "HUF",
    "チェコ": "CZK",
    "セルビア": "RSD",
    "クロアチア": "HRK",
    "スロバキア": "SKK",
    "オーストリア": "EUR",
    "デンマーク": "DKK",
    "フィンランド": "EUR",
    "ノルウェー": "NOK",
    "アイスランド": "ISK",
    "ポルトガル": "EUR",
    "ギリシャ": "EUR",
    "アイルランド": "EUR",
    "ルクセンブルク": "EUR",
    "ベルギー": "EUR",
    "スロベニア": "EUR",
    "エストニア": "EUR",
    "ラトビア": "EUR",
    "リトアニア": "EUR",
    "リビア": "LYD",
    "ガーナ": "GHS",
    "コートジボワール": "CIV",
    "モザンビーク": "MZN",
    "ケニア": "KES",
    "ジンバブエ": "ZWL",
    "タンザニア": "TZS",
    "ウガンダ": "UGX",
    "アフガニスタン": "AFN",
    "イラク": "IQD",
    "シリア": "SYP",
    "ヨルダン": "JOD",
    "レバノン": "LBP",
    "パレスチナ": "ILS",
    "バーレーン": "BHD",
    "オマーン": "OMR",
    "イエメン": "YER",
    "アゼルバイジャン": "AZN",
    "ジョージア": "GEL",
    "キルギス": "KGS",
    "タジキスタン": "TJS",
    "ウズベキスタン": "UZS",
    "モンゴル": "MNT",
    "カザフスタン": "KZT",
    "トルクメニスタン": "TMT",
    "キプロス": "CYP",
    "マルタ": "MOP"
};

// 為替レートを取得する関数
async function checkRate() {
    const baseCurrency = document.getElementById("baseCurrency").value; // ベース通貨
    const targetCountry = document.getElementById("targetCurrency").value.trim(); // 入力された国名
    const resultElement = document.getElementById("result");

    // 入力された日本語の国名を通貨コードに変換
    const targetCurrency = countryToCurrency[targetCountry];

    // デバッグ用出力
    console.log("入力された国名:", targetCountry);
    console.log("対応する通貨コード:", targetCurrency);

    // 国名から通貨コードを取得できなかった場合
    if (!targetCurrency) {
        resultElement.textContent = `「${targetCountry}」に対応する通貨が見つかりません。正しい国名を入力してください。`;
        resultElement.classList.add("error");
        return;
    }

    // APIエンドポイント
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.rates[targetCurrency]) {
            const rate = data.rates[targetCurrency];
            resultElement.text
