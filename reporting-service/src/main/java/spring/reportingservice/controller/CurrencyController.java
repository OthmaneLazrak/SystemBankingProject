package spring.reportingservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spring.reportingservice.dto.CurrencyRateResponse;
import spring.reportingservice.service.CurrencyService;

@RestController
@RequestMapping("/reporting")
@CrossOrigin(origins = "http://localhost:5173")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;


    //https://api.frankfurter.app/currencies
    @GetMapping("/currency")
    public CurrencyRateResponse getCurrencyRate(@RequestParam String from, @RequestParam String to) {
        return currencyService.getExchangeRate(from, to);
    }
}