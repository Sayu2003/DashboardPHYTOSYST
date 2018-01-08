
int rainPin = A0;
int whiteLED = 6;
int redLED = 7;
// you can adjust the threshold value
int thresholdValue = 800;

void setup(){
  pinMode(rainPin, INPUT);
  pinMode(whiteLED, OUTPUT);
  pinMode(redLED, OUTPUT);
  digitalWrite(whiteLED, LOW);
  digitalWrite(redLED, LOW);
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(rainPin);
  Serial.print(sensorValue);
  if(sensorValue < thresholdValue){
    Serial.println(" - Doesn't need watering");
    digitalWrite(redLED, LOW);
    digitalWrite(whiteLED, HIGH);
  }
  else {
    Serial.println(" - Time to water your plant");
    digitalWrite(redLED, HIGH);
    digitalWrite(whiteLED, LOW);
  }
  delay(500);
}
