package connect.security;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity handleDataIntergrity(DataIntegrityViolationException exception) {
        return ResponseEntity.badRequest().body(exception.getLocalizedMessage());
    }


}
