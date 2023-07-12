void main() {
  print(sayHello1(
    age: 24,
    name: 'gori',
  ));

  print(sayHello2(
    name: 'gori',
    age: 24,
    country: 'seoul',
  ));

  print(sayHello3('gori', 24));

  capitializeName('gori');
  capitializeName(null);

  print(reverseListOfNumbers([1, 2, 3]));
}

String sayHello1({
  String name = 'anon',
  int age = 20,
  String country = 'seoul',
}) {
  return "Hello $name, you are $age, and you come from $country.";
}

String sayHello2({
  required String name,
  required int age,
  required String country,
}) {
  return "Hello $name, you are $age, and you come from $country.";
}

String sayHello3(String name, int age, [String? country = 'seoul']) =>
    "Hello $name, you are $age, and you come from $country.";

String capitializeName(String? name) => name?.toUpperCase() ?? 'ANON';

typedef ListOfInts = List<int>;

ListOfInts reverseListOfNumbers(ListOfInts list) {
  var reversed = list.reversed;
  return reversed.toList();
}
