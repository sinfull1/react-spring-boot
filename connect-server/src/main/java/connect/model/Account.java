package connect.model;


import lombok.Data;

@Data
public class Account {

    private long accountId;
    private String accountType;
    private long partyId;

}
