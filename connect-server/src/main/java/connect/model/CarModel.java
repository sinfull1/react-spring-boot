package connect.model;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CarModel {

    private String make;
    private String model;
    private Integer price;
}
