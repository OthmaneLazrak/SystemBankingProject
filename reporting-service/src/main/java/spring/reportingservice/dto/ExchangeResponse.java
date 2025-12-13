package spring.reportingservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeResponse {
    private double amount;
    private String base;
    private String date;
    private Map<String, Double> rates;
}
