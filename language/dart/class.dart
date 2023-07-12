void main() {
  var bluePlayer = Player.createBluePlayer(
    name: 'juju',
    age: 21,
  );
  var redPlayer = Player.createRedPlayer('gori', 21);

  // Cascade Notation
  var gori =
      Player(name: 'gori', xp: 1200, age: 24, team: Team.blue.toString());
  var juu = gori
    ..name = 'juju'
    ..xp = 2000
    ..age = 25
    ..team = Team.red.toString();
}

enum Team { red, blue }

abstract class Human {
  void walk();
}

class Player extends Human {
  String name, team;
  int xp, age;

  Player({
    required this.name,
    required this.xp,
    required this.age,
    required this.team,
  });

  Player.createBluePlayer({
    required String name,
    required int age,
  })  : this.age = age,
        this.name = name,
        this.team = 'blue',
        this.xp = 0;

  Player.createRedPlayer(
    String name,
    int age,
  )   : this.age = age,
        this.name = name,
        this.team = 'red',
        this.xp = 0;

  Player.fromJson(Map<String, dynamic> playerJson)
      : age = playerJson['age'],
        name = playerJson['name'],
        xp = playerJson['xp'],
        team = playerJson['team'];

  void walk() {
    print("The player is walking");
  }
}

class Coach extends Human {
  void walk() {
    print("The coach is walking");
  }
}
