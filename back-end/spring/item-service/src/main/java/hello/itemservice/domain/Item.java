package hello.itemservice.domain;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Item {
    private Long id;

    public Item(String itemName, Integer price, Integer quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }

    private String itemName;
    private Integer price;
    private Integer quantity;
}
