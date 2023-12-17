DIGITS_ENGLISH_MAPPER = {
  'zero' => '0',
  'one' => '1',
  'two' => '2',
  'three' => '3',
  'four' => '4',
  'five' => '5',
  'six' => '6',
  'seven' => '7',
  'eight' => '8',
  'nine' => '9'
}

FIND_DIGITS_PATTERN = /(?=(#{DIGITS_ENGLISH_MAPPER.keys.join('|')}|\d))/

def convert_to_digit(str)
  DIGITS_ENGLISH_MAPPER[str] || str
end

calibration_values = File.foreach('input.text').map do |line|
    digits = line.scan(FIND_DIGITS_PATTERN).flatten
    (convert_to_digit(digits.first) + convert_to_digit(digits.last))
end

sum = calibration_values.map(&:to_i).sum

puts "The sum of all calibration values is #{sum}"
