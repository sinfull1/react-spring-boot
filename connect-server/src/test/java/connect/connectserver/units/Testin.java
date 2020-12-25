package connect.connectserver.units;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MappingJsonFactory;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;

public class Testin {

    @Test
    public void test () throws IOException {
        JsonFactory f = new MappingJsonFactory();
        JsonParser jp = f.createParser(new File("C:\\Users\\micro\\IdeaProjects\\react-spring-boot\\connect-server\\src\\main\\resources\\sample.json"));
        JsonToken current;
            // move from field name to field value
            current = jp.nextToken();

                if (current == JsonToken.START_ARRAY) {
                    // For each of the records in the array
                    while (jp.nextToken() != JsonToken.END_ARRAY) {
                        // read the record into a tree model,
                        // this moves the parsing position to the end of it
                        JsonNode node = jp.readValueAsTree();
                        // And now we have random access to everything in the object

                    }
                } else {
                    System.out.println("Error: records should be an array: skipping.");
                    jp.skipChildren();
                }
            }

}
