from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def click_buttons_and_copy_link(url):
    driver = None  # Initialize driver variable
    try:
        option = webdriver.ChromeOptions()
        option.add_argument('--no-sandbox')
        option.add_argument('--disable-dev-shm-usage')
        option.add_argument('--disable-gpu')
        option.add_argument("--headless=new")
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=option)

        # Open the URL
        driver.get(url)

        # Find the first button by its XPath
        #button1 = driver.find_element("xpath", '/html/body/div[3]/div/div/div[3]/button')
        button0 = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "/html/body/div[3]/div/div/div[2]/div/button"))
        )
        
        button0.click()
        
        # Click the first button
        button1 = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "/html/body/div[3]/div/div/div[3]/button"))
        )
        
        button1.click()

        # Find the second button by its XPath
        button2 = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "/html/body/div[1]/div/header/div[3]/div/button"))
        )
        
        # Click the second button
        button2.click()
        
        # Find the input element containing the generated link by its XPath
        link_input = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "/html/body/div[3]/div/div/div[2]/div[2]/input"))
        )
        
        # Get the value of the input element (which should be the link)
        generated_link = link_input.get_attribute("value")
        
        print(generated_link)
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if driver is not None:
            # Close the browser
            driver.quit()

# Example usage
if __name__ == "__main__":
    url = "https://www.leapchat.org/"  # Replace this with your specific URL
    click_buttons_and_copy_link(url)
