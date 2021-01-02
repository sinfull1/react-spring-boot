package connect.security;


import io.jsonwebtoken.lang.Strings;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthCodeRequest {
    private String response_type;
    private String state;
    private String redirect_uri;
    private String scope;
    private String client_id;


    public static AuthCodeRequest getAuthCodeObject(String request) {
        AuthCodeRequest authCodeRequest = new AuthCodeRequest();
        String [] array = Strings.split(request, "response_type=");
        String [] array2 = Strings.split(array[1], "&state=");
        authCodeRequest.setResponse_type(array2[0]);
        String [] array3 = Strings.split(array2[1], "&redirect_uri=");
        authCodeRequest.setState(array3[0]);
        String [] array4 = Strings.split(array3[1], "&scope=");
        authCodeRequest.setRedirect_uri(array4[0]);
        String [] array5 = Strings.split(array4[1], "&client_id=");
        authCodeRequest.setScope(array5[0]);
        authCodeRequest.setClient_id(array5[1]);
        return authCodeRequest;


    }

}



