package connect.model;

import lombok.Data;

import java.util.List;


@Data
public class AccountToPartyRel {

    private List<Long> partyId;
    private long accountId;

}
