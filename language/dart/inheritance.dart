mixin Strong {
  final double strenghtLevel = 1500.99;
}

mixin QuickRunner {
  void runQuick() {
    print("runnnnnnn!");
  }
}

mixin Tall {
  final double height = 1.99;
}

class Human {
  final String name;
  Human({required this.name});

  void sayHello() {
    print("Hi my name is $name");
  }
}

enum Team { blue, red }

class Player extends Human {
  final Team team;

  Player({
    required this.team,
    required String name,
  }) : super(name: name);

  @override
  void sayHello() {
    super.sayHello();
    print('and I play for ${team}');
  }
}

class FastPlayer with Strong, QuickRunner, Tall {
  final Team team;

  FastPlayer(this.team);
}

class Horse with Strong, QuickRunner {}

void main() {
  var player = Player(
    team: Team.red,
    name: 'gori',
  );
  player.sayHello();
}
