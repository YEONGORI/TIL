void main() {
  // Basic data type
  String name = 'gori';
  bool alive = true;
  int age = 24;
  double money = 100.99;
  num x = 12; // could be int or double, num is parent class of int and double
  x = 12.0;

  // String interpolation
  var my_name = 'gori';
  var my_age = 24;
  var greeting = "Hello everyone, my name is $my_name and I'm ${my_age + 2}!";
  print(greeting);

  // Lists
  var giveMeFive = true;
  var numbers1 = [
    1,
    2,
    3,
    4,
    if (giveMeFive) 5, // collection if
    6,
    7,
    8,
  ];
  print(numbers1);

  var oldFriends = ['gori', 'minju'];
  var newFriends = [
    'kki',
    'imm',
    for (var friend in oldFriends) "GOOD $friend", // collection for
  ];
  print(newFriends);

  // Maps
  var player = {
    'name': 'gori',
    'xp': 19.99,
    'superpower': false,
  };
  Map<List<int>, bool> players1 = {
    [1, 2, 3]: true,
  };
  List<Map<String, Object>> players2 = [
    {
      'name': 'nico',
      'xp': 19.99,
    },
    {
      'name': 'gori',
      'xp': 39.99,
    }
  ];

  // Sets
  var num1 = {1, 2, 3, 4};
  Set<int> num2 = {1, 2, 3, 4};
}
