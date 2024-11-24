package org.acme.converter;

import jakarta.ws.rs.ext.ParamConverter;
import jakarta.ws.rs.ext.ParamConverterProvider;
import jakarta.ws.rs.ext.Provider;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Provider
public class LocalDateTimeParamConverter implements ParamConverterProvider {

    @SuppressWarnings("unchecked")
    @Override
    public <T> ParamConverter<T> getConverter(final Class<T> rawType, Type genericType, Annotation[] annotations) {
        if (rawType != LocalDateTime.class) {
            return null;
        }

        return new ParamConverter<T>() {
            @Override
            public T fromString(String value) {
                if (value == null || value.trim().isEmpty()) {
                    return null;
                }
                try {
                    return (T) LocalDateTime.parse(value, DateTimeFormatter.ISO_DATE_TIME);
                } catch (DateTimeParseException e) {
                    throw new IllegalArgumentException("Invalid date format. Use ISO_DATE_TIME format (e.g., 2024-01-01T00:00:00)", e);
                }
            }

            @Override
            public String toString(T value) {
                return value != null ? ((LocalDateTime) value).format(DateTimeFormatter.ISO_DATE_TIME) : null;
            }
        };
    }
}
