// كود وضع رقعات الشطرنج
let squar = [];
let squarlift = [];
let squartop = [];
let number = [];
let safer;
let board = document.getElementsByClassName("board")[0];
let team1wins = document.getElementsByClassName("team1wins")[0];
let team2wins = document.getElementsByClassName("team2wins")[0];
// #808080
// #e0e0e0
for (i = 0; i < 64; i++) {
  // عمل مربعات الشطرنج
  squar[i] = document.createElement("div");
  squar[i].id = `s${i + 1}`;
  squar[i].className = "sq";
  squar[i].style.cssText =
    "width: 100px;height: 100px;border: 1px solid ;border-image:linear-gradient(45deg, #808080, #b7b5b5, #808080, #b7b5b5,#808080)1 ;display: flex;justify-content: center;align-items: center;position: relative;";
  board.append(squar[i]);
  // ترقيم المربعات
  number[i] = document.createElement("div");
  number[i].style.cssText =
    "font-weight: bold;user-select: none;width:10px; height:10px;position: absolute; left:0; top:0;display: flex;justify-content: center;align-items: center;font-size:10px;color:#808080;margin: 2px;font-weight: bold;  ";
  number[i].innerHTML = `${i + 1}`;
  squar[i].append(number[i]);
  // عمل احداثيات لرقعات الشطرنج
  squarlift[i] = i * 100 + 50;
  safer = i;
  for (s = 0; safer + 1 > 8; s++) {
    safer = safer - 8;
  }
  squartop[i] = s * 100 + 50;
  for (; squarlift[i] > 800;) {
    squarlift[i] = squarlift[i] - 800;
  }
}
// كود انشاء قطع القتال
// كود وضع القطع فى مكانها
let placing = function (fire, squarnumber) {
  fire.style.top = `${squartop[squarnumber - 1]}px`;
  fire.style.left = `${squarlift[squarnumber - 1]}px`;
};
// كود opp للابطال
class mainforce {
  constructor(thename, color, thehp, team, damage, place, range, speed) {
    this.Structure = document.createElement("div");
    this.Structure.style.cssText =
      "border-radius: 50%;width: 40px;height: 40px;position: absolute;transform: translate(-50% , -50%);transition-duration: .3s ;background-size: 40px , 40px;";
    this.Structure.style.backgroundImage = color;
    this.Name = thename;
    this.Hp = thehp;
    this.HpMax = thehp;
    this.Team = team;
    this.Damage = damage;
    this.Place = place;
    this.Speed = speed;
    this.Bar = document.createElement("div");
    this.Bar.style.cssText =
      "width: 80px;height: 8px;position: absolute;top: -10px;left: -20px;border: .2px solid white;";
    this.Bar.style.display = "none";
    this.Health = document.createElement("div");
    this.Health.style.cssText =
      "background-color: green;width: 100%;height: 100%;";
    this.structure = function () {
      board.append(this.Structure);
      placing(this.Structure, this.Place);
      this.Structure.append(this.Bar);
      this.Bar.append(this.Health);
      if (range != 1) {
        this.Fire = document.createElement("div");
        board.append(this.Fire);
        this.Fire.className = "fire";
        this.Fire.style.cssText =
          "position: absolute;width: 5px;height: 5px;border-radius: 50%;background-color: firebrick;transform: translate(-50% , -50%);transition-timing-function:linear ;transition-duration: .3s ;transition-property: left , top ; z-index: 1;display: none;";
        placing(this.Fire, this.Place);
      }
    };
  }
}
force1 = new mainforce(
  "drager",
  "url(images/comodo.jpg)",
  1200,
  "team1",
  100,
  21,
  5,
  600
);
force1.structure();
force5 = new mainforce(
  "drager2",
  "url(images/comodo.jpg)",
  1200,
  "team1",
  100,
  12,
  5,
  600
);
force5.structure();
force6 = new mainforce(
  "drager3",
  "url(images/comodo.jpg)",
  1200,
  "team1",
  100,
  14,
  5,
  600
);
force6.structure();

force2 = new mainforce(
  "magic",
  "url(images/orca.jpg)",
  1200,
  "team2",
  100,
  44,
  5,
  600
);
force2.structure();
force3 = new mainforce(
  "shark",
  "url(images/orca.jpg)",
  1200,
  "team2",
  100,
  45,
  5,
  600
);
force3.structure();
force4 = new mainforce(
  "wolf",
  "url(images/orca.jpg)",
  1200,
  "team2",
  100,
  46,
  5,
  600
);
force4.structure();

forces = [force2, force3, force4, force5, force1, force6];
team1 = forces.filter(function (ele) {
  if (ele.Team === "team1") {
    return ele;
  }
});
team2 = forces.filter(function (ele) {
  if (ele.Team === "team2") {
    return ele;
  }
});

//  كود زر بداية المعركه و نهايتها
let Start = document.querySelector(".start");

let time1;
let time2;

Start.addEventListener("click", function () {
  // بداية المعركه
  if (Start.className === "start") {
    StartBattle();
  } /* نهاية المعركه*/ else {
    EndOfBattle();
  }
});

// End Of battle function
let EndOfBattle = function () {
  clearTimeout(time);
  clearTimeout(time1);
  clearTimeout(time2);
  for (i = 1; i < 99999; i++) window.clearInterval(i);
  forces.forEach(function (force) {
    force.Bar.style.display = "none";
    force.Fire.style.display = "none";
    force.Hp = force.HpMax;
    force.Structure.style.display = "block";
    force.Health.style.width = "100%";
  });
  Start.innerHTML = "start";
  Start.classList.remove("work");
};

// Start Battle function
let StartBattle = function () {
  forces.forEach(function (force) {
    force.Bar.style.display = "block";
    force.Fire.style.display = "block";
    force.Fire.style.opacity = "0";
    //   كود تحديد  مكان الخصم واستهدافه
    targetEnemy(force);
    //   نهاية كود تحديد مكان الخصم واستهدافه
  });
  //  كود الاستمرار فى اشياء يجب فعلها اثناء سير القتال
  setInterval(function () {
    forces.forEach(function (force) {
      if (force.Hp <= 0) {
        force.Structure.style.display = "none";
      }
      placing(force.Structure, force.Place);
    });
  }, 20);
  time = setTimeout(function () {
    EndOfBattle();
  }, 60000);


  Start.innerHTML = "stop";
  Start.classList.add("work");
};

//   دالة تحديد مكان الخصم واستهدافه وتحريك القذائف
let targetEnemy = function (force) {
  setInterval(function () {
    // force هنا ليست من الفريق الاول علشان متتلخبطش
    team2play = team2.filter(function (force) {
      if (force.Structure.style.display !== "none") {
        return force;
      }
    });
    if (team2play.length === 0) {
      setTimeout(function () {
        EndOfBattle();
      }, 0);
    }
    if (force.Team === "team1" && force.Structure.style.display !== "none") {
      if (team2play.length !== 0) {
        let target = team2play.reduce(function (acc, ele2) {
          if (ele2.Team !== "team1" && acc.Team !== "team1") {
            if (
              Closest(
                force.Structure.style.top,
                force.Structure.style.left,
                acc.Structure.style.top,
                acc.Structure.style.left
              ) <
              Closest(
                force.Structure.style.top,
                force.Structure.style.left,
                ele2.Structure.style.top,
                ele2.Structure.style.left
              )
            ) {
              return acc;
            } else {
              acc = ele2;
              return acc;
            }
          }
        });
        force.Fire.style.opacity = "1";
        placing(force.Fire, target.Place);
        time1 = setTimeout(function () {
          force.Fire.style.opacity = "0";
          placing(force.Fire, force.Place);
          target.Hp = target.Hp - force.Damage;
          target.Health.style.width = `${(target.Hp / target.HpMax) * 100}%`;
        }, force.Speed / 2);
      } else {
        EndOfBattle();
        team1wins.innerHTML = `${parseInt(team1wins.innerHTML) + 1}`;
      }
    }
  }, force.Speed);
  setInterval(function () {
    // force هنا ليست من الفريق الاول علشان متتلخبطش
    // جملة if التانيه دى ذياده على الكود وملهاش اى لازمه بس انا كاتبها احطياتى
    team1play = team1.filter(function (force) {
      if (force.Structure.style.display !== "none") {
        return force;
      }
    });
    // دى اهى
    if (team1play.length === 0) {
      setTimeout(function () {
        EndOfBattle();
      }, 0);
    }
    if (force.Team === "team2" && force.Structure.style.display !== "none") {
      if (team1play.length !== 0) {
        let target = team1play.reduce(function (acc, ele2) {
          if (ele2.Team !== "team2" && acc.Team !== "team2") {
            if (
              Closest(
                force.Structure.style.top,
                force.Structure.style.left,
                acc.Structure.style.top,
                acc.Structure.style.left
              ) <
              Closest(
                force.Structure.style.top,
                force.Structure.style.left,
                ele2.Structure.style.top,
                ele2.Structure.style.left
              )
            ) {
              return acc;
            } else {
              acc = ele2;
              return acc;
            }
          }
        });
        force.Fire.style.opacity = "1";
        placing(force.Fire, target.Place);
        time2 = setTimeout(function () {
          force.Fire.style.opacity = "0";
          placing(force.Fire, force.Place);
          target.Hp = target.Hp - force.Damage;
          target.Health.style.width = `${(target.Hp / target.HpMax) * 100}%`;
        }, force.Speed / 2);
      } else {
        EndOfBattle();
        team2wins.innerHTML = `${parseInt(team2wins.innerHTML) + 1}`;
      }
    }
  }, force.Speed);
};
// كود تحريك الابطال بالماوس قبل بدأ المعركه
forces.forEach(function (element) {
  element.Structure.style.transition = "0s";
  var isDragging = false;
  var offset = { x: 0, y: 0 };
  // إضافة مستمع لحدث النقر بالماوس
  element.Structure.addEventListener("mousedown", function (e) {
    if (Start.className !== "start work") {
      isDragging = true;
      // حساب الفرق بين موقع الماوس وموقع العنصر
      offset.x = e.clientX - element.Structure.offsetLeft;
      offset.y = e.clientY - element.Structure.offsetTop;
    }
  });
  // إضافة مستمع لحدث حركة الماوس
  document.addEventListener("mousemove", function (e) {
    if (Start.className !== "start work") {
      if (!isDragging) return;
      // حساب الموقع الجديد للعنصر باستخدام موقع الماوس والفرق المحسوب سابقًا
      var x = e.clientX - offset.x;
      var y = e.clientY - offset.y;
      // تعيين الموقع الجديد للعنصر
      element.Structure.style.left = x + "px";
      element.Structure.style.top = y + "px";
    }
  });
  // إضافة مستمع لحدث رفع الماوس
  document.addEventListener("mouseup", function () {
    if (Start.className !== "start work") {
      var acc = 1000;
      var place = 0;
      var start = 0;
      var end = 32;
      if (element.Team === "team2") {
        start = 32;
        end = 64;
      }
      for (i = start, d = 0; i < end; i++) {
        d = Closest(
          element.Structure.style.left,
          element.Structure.style.top,
          squarlift[i],
          squartop[i]
        );
        if (d < acc) {
          acc = d;
          place = i + 1;
        }
      }
      element.Place = place;
      placing(element.Structure, element.Place);
      placing(element.Fire, element.Place);
      isDragging = false;
    }
  });
});
// دالة تحديد اقرب مسافه
let Closest = function (X1, X2, Y1, Y2) {
  return Math.sqrt(
    (parseInt(X1) - parseInt(Y1)) * (parseInt(X1) - parseInt(Y1)) +
    (parseInt(X2) - parseInt(Y2)) * (parseInt(X2) - parseInt(Y2))
  );
};
