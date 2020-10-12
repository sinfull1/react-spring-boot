package connect.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import connect.serializer.AccountSerializer;
import connect.serializer.PartySerializer;
import lombok.Data;
import lombok.Setter;
import reactor.core.publisher.Mono;

@Data
@Setter
public class Hierarchy {

    @JsonSerialize(using= PartySerializer.class)
    private Mono<Party> party;

    @JsonSerialize(using= AccountSerializer.class)
    private Mono<Party> account;

}
