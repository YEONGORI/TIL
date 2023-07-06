void main() {
  // var keyword
  var name1 = "gori"; // in most cases
  String name2 = 'gori'; // in class properties

  // dynamic variable
  dynamic move;
  if (move is String) {
    move.contains('a');
  }
  if (move is int) {
    move.floor();
  }
  if (move is bool) {
    move = true;
  }

  // nullable variables
  String? gori = 'gori';
  gori = null;
  if (gori != null) {
    gori.isNotEmpty;
  }
  gori?.isNotEmpty; // if not null

  // final variables
  final me = 'gori'; // run-time constant
  print(me);

  // late variables
  late final String i;
  i = 'gori';
  print(i);

  // constant variables
  const api_key = 'gori'; // compile-time constant
  print(api_key);
}
