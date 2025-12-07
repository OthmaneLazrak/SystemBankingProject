package spring.reportingservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class CurrencyService {

    @Autowired
    private WebClient.Builder webClientBuilder;


    public double getExchangeRate(String from, String to) {
        WebClient webClient = webClientBuilder.baseUrl("https://api.frankfurter.app").build();

        Map<String, Object> response = webClient.get()
                .uri("/latest?from={from}&to={to}", from, to)
                .retrieve()
                .bodyToMono(Map.class)
                .block(); // synchrone pour simplifier

        Map<String, Double> rates = (Map<String, Double>) response.get("rates");
        double rate = rates.get(to);

        return rate;
    }
}
