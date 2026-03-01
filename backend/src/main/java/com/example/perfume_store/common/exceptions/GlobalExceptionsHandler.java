package com.example.perfume_store.common.exceptions;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

import static org.springframework.util.StringUtils.capitalize;

@RestControllerAdvice
@Slf4j
@AllArgsConstructor
public class GlobalExceptionsHandler {

    private ExceptionHandlerUtil exceptionHandlerUtil;

    // Exception Handlers
    @ExceptionHandler({
            NotFoundException.class,
            UsernameNotFoundException.class
    })
    public ResponseEntity<?> handleNotFound(Exception ex, HttpServletRequest request) {
        return ApiResponseFactory.error(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    /**
     * Request DTO validation fails
     */
    @ExceptionHandler({
            MethodArgumentNotValidException.class
    })
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getDefaultMessage())
                .toList();

        return ApiResponseFactory.error(HttpStatus.BAD_REQUEST, errors.getFirst(), request);
    }

    /**
     * Mismatch datatype
     */
    @ExceptionHandler({
            MethodArgumentTypeMismatchException.class,
            HandlerMethodValidationException.class,
    })
    public ResponseEntity<?> handleBadRequest(Exception ex, HttpServletRequest request) {
        return ApiResponseFactory.error(HttpStatus.BAD_REQUEST, "Invalid Request", request);
    }

    /**
     * Request Params validation fails
     */
    @ExceptionHandler({
            ConstraintViolationException.class
    })
    public ResponseEntity<?> handleRequestParamValidation(Exception ex, HttpServletRequest request) {
        return ApiResponseFactory.error(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    /**
     * Handle exceptions database throws when inserted, updated, deleted
     */
    @ExceptionHandler({
            DataIntegrityViolationException.class
    })
    public ResponseEntity<?> handleDatabaseExceptions(DataIntegrityViolationException ex, HttpServletRequest request) {
        String message = "An error occurred";

        // Get exactly the error message
        Throwable root = ex.getRootCause();

        if (root != null) {
            String rootMessage = root.getMessage();

            if (rootMessage.contains("Duplicate entry")) {
                message = exceptionHandlerUtil.extractDuplicateMessage(rootMessage);
            }
            else if (rootMessage.contains("cannot be null")) {
                message = "Required field is missing.";
            }
            else if (rootMessage.contains("foreign key constraint")) {
                message = "Operation failed due to related existing records.";
            }
            else if (rootMessage.contains("Data too long")) {
                message = "Input value exceeds allowed length.";
            }
        }

        return ApiResponseFactory.error(HttpStatus.CONFLICT, message, request);
    }

    @ExceptionHandler({
            BadCredentialsException.class
    })
    public ResponseEntity<?> handleAuthenticationException(Exception ex, HttpServletRequest request) {
        return ApiResponseFactory.error(HttpStatus.UNAUTHORIZED, "Username or password is invalid!", request);
    }

    @ExceptionHandler({
            JwtException.class
    })
    public ResponseEntity<?> handleJwtTokenExceptions(Exception ex, HttpServletRequest request) {
        return ApiResponseFactory.error(HttpStatus.FORBIDDEN, ex.getMessage(), request);
    }

    @ExceptionHandler({
            Exception.class
    })
    public ResponseEntity<?> handleUnknown(Exception ex, HttpServletRequest request) {
        log.error(ex.getMessage());
        return ApiResponseFactory.error(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong, please try again later!", request);
    }
}

@Component
class ExceptionHandlerUtil {

    public String extractDuplicateMessage(String rootMessage) {
        try {
            int keyIndex = rootMessage.indexOf("for key");
            String keyPart = rootMessage.substring(keyIndex);
            String field = keyPart.replace("for key", "")
                    .replace("'", "")
                    .trim();

            if (field.contains(".")) {
                field = field.substring(field.indexOf(".") + 1);
            }

            return capitalize(field) + " already exists.";
        } catch (Exception e) {
            return "Duplicate value already exists.";
        }
    }
}