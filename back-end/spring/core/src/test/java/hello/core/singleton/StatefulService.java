package hello.core.singleton;

public class StatefulService {
    /*
    싱글톤에서 가장 문제가 되는 Stateful한 코드
    private int price; // 상태를 유지하는 필드

    public void order(String name, int price) {
        System.out.println("name = " + name + " price = " + price);
        this.price = price; // 여기가 문제가 된다.
    }
     */

    /*
    싱글톤에서 사용해야 하는 Stateless한 코드
     */
    public int order(String name, int price) {
        System.out.println("name = " + name + " price = " + price);
        return price;
    }

}
