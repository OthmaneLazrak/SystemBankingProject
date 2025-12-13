package spring.reportingservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import spring.reportingservice.dto.CurrencyRateResponse;
import spring.reportingservice.dto.ExchangeResponse;

import java.util.Map;

@Service
public class CurrencyService {

    @Autowired
    private WebClient.Builder webClientBuilder;


    public CurrencyRateResponse getExchangeRate(String from, String to) {
        WebClient webClient = webClientBuilder.baseUrl("https://api.frankfurter.app").build();

        /*Map<String, Object> response = webClient.get()
                .uri("/latest?from={from}&to={to}", from, to)
                .retrieve()
                .bodyToMono(Map.class)
                .block(); // synchrone pour simplifier
        */

        ExchangeResponse response = webClient.get()
                .uri("/latest?from={from}&to={to}", from, to)
                .retrieve()
                .bodyToMono(ExchangeResponse.class)
                .block();

        double rate = response.getRates().get(to);

        return new CurrencyRateResponse(from, to, rate, response.getDate());
    }
}
