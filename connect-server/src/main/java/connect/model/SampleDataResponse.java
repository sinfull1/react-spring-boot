package connect.model;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Getter
public class SampleDataResponse {

    private List<SampleData> sampleData;
}
