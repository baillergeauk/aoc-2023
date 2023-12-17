calibration_values = File.open('input.text', 'r') do |file|
  file.readlines.map do |line|
    digits = line.scan(/\d/)
    (digits.first + digits.last).to_i
  end
end

puts calibration_values.sum
