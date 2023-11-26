// ト音記号とヘ音記号で切り替えるためのグローバル変数
let currentClef = "treble"; // 初期値はト音記号

// ト音記号とヘ音記号の表示を切り替える関数
function toggleClef() {
  if (document.getElementById("trebleClef").checked) {
    clef.classList.remove("bass-clef");
    clef.classList.add("treble-clef");
    currentClef = "treble"; // ト音記号に設定
  } else {
    clef.classList.remove("treble-clef");
    clef.classList.add("bass-clef");
    currentClef = "bass"; // ヘ音記号に設定
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const staff = document.getElementById("staff");
  const noteText = document.getElementById("note");
  const clef = document.getElementById("clef");
  // 初期状態としてト音記号を表示するために、
  // trebleClefラジオボタンがチェックされていることを確認します。
  const trebleClefRadio = document.getElementById("trebleClef");
  if (trebleClefRadio.checked) {
    clef.classList.add("treble-clef");
  }

  // ラジオボタンのイベントリスナーを更新
  document.getElementById("trebleClef").addEventListener("change", function () {
    if (this.checked) {
      console.log("trebleClef");
      clef.classList.remove("bass-clef");
      clef.classList.add("treble-clef");
    }
  });

  document.getElementById("bassClef").addEventListener("change", function () {
    if (this.checked) {
      console.log("bassClef");
      clef.classList.remove("treble-clef");
      clef.classList.add("bass-clef");
    }
  });
  // 初期状態としてト音記号を表示
  // 初期状態でト音記号を表示
  toggleClef();

  // 五線譜の線を描画
  for (let i = 1; i <= 5; i++) {
    const line = document.createElement("div");
    line.classList.add("line", "line" + i);
    staff.appendChild(line);
  }

  // 音符を生成して五線譜に追加
  const note = document.createElement("div");
  note.classList.add("note");
  // ト音記号の幅を取得して、その右側に音符の初期位置を設定
  note.style.left = "120px"; // ト音記号の幅が120pxの場合
  staff.appendChild(note);

  // 音符をマウスの位置に追従させる
  staff.addEventListener("mousemove", function (e) {
    const staffRect = staff.getBoundingClientRect();
    const staffSpace = staffRect.height / 8; // 9段階（4つのスペースと5つの線）を作成する
    let y = e.clientY - staffRect.top; // マウス位置のY座標（五線譜内での相対位置）

    // 音符を線または線の間にスナップさせる
    y = Math.round(y / staffSpace) * staffSpace;

    // 音符の位置を更新（五線譜の高さに対して中央に位置するように調整）
    note.style.top = y - note.offsetHeight / 2 + "px";

    // 音階のテキストを更新
    noteText.textContent = getNoteName(y, staffRect.height);
  });

  // 音階名を返す関数（ドレミファソラシドで表現）
  function getNoteName(y, height) {
    // ト音記号の場合の音階名
    const trebleNotes = [
      "ファ",
      "ミ",
      "レ",
      "ド",
      "シ",
      "ラ",
      "ソ",
      "ファ",
      "ミ",
    ];
    // ヘ音記号の場合の音階名（ト音記号から2段階ずらす）
    const bassNotes = ["ラ", "ソ", "ファ", "ミ", "レ", "ド", "シ", "ラ", "ソ"];

    // 五線譜の高さに対する音符の位置を計算
    const index = Math.round(y / (height / 8));
    // 現在の譜面に応じて音階名を返す
    if (currentClef === "treble") {
      return trebleNotes[index] || trebleNotes[trebleNotes.length - 1];
    } else {
      return bassNotes[index] || bassNotes[bassNotes.length - 1];
    }
  }

  // ラジオボタンのイベントリスナー
  document.getElementById("trebleClef").addEventListener("change", toggleClef);
  document.getElementById("bassClef").addEventListener("change", toggleClef);

  // ラジオボタンのイベントリスナー
  // Bootstrapが使用しているイベントをバインド
  $("input[type=radio][name=clef]").on("change", function () {
    toggleClef();
  });
  // 初期状態でト音記号を表示
  toggleClef();
});
