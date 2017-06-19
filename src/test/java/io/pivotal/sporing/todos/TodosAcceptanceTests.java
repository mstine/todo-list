package io.pivotal.sporing.todos;

import org.fluentlenium.adapter.junit.FluentTest;
import org.fluentlenium.core.hook.wait.Wait;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Matt Stine
 */
@Wait
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class TodosAcceptanceTests extends FluentTest {

    @Override
    public String getWebDriver() {
        return "chrome";
    }

    @Test
    public void testLogin() {
        goTo("http://localhost:8080");
        $("#username").fill().with("joeuser");
        $("#password").fill().with("password");
        $("#sign-in").submit();
        assertThat(window().title()).contains("SPOring Todos");
    }
}
