package spring.reportingservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import spring.reportingservice.service.CurrencyService;

@RestController
@RequestMapping("/reporting")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    @GetMapping("/currency")
    public double getCurrencyRate(@RequestParam String from, @RequestParam String to) {
        return currencyService.getExchangeRate(from, to);

    }
}