package spring.reportingservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrencyRateResponse {
    private String from;
    private String to;
    private double rate;
    private String date;
}