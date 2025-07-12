let currentTab = 'length';

        // Length conversion factors (to meters)
        const lengthFactors = {
            m: 1,
            cm: 0.01,
            mm: 0.001,
            km: 1000,
            ft: 0.3048,
            in: 0.0254,
            yd: 0.9144,
            mi: 1609.34
        };

        // Weight conversion factors (to grams)
        const weightFactors = {
            g: 1,
            kg: 1000,
            lb: 453.592,
            oz: 28.3495,
            t: 1000000,
            st: 6350.29
        };

        function switchTab(tab) {
            // Hide all forms
            document.querySelectorAll('.converter-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab').forEach(tabEl => {
                tabEl.classList.remove('active');
            });
            
            // Show selected form
            document.getElementById(tab + 'Form').classList.add('active');
            
            // Add active class to clicked tab
            event.target.classList.add('active');
            
            // Update result tab
            document.getElementById('resultTab').textContent = tab.charAt(0).toUpperCase() + tab.slice(1);
            
            currentTab = tab;
            resetCalculator();
        }

        function convertLength(formData) {
            const input = parseFloat(formData.get('lengthValue'));
            const fromUnit = formData.get('lengthFromUnit');
            const toUnit = formData.get('lengthToUnit');
            
            if (isNaN(input)) {
                document.getElementById('result').textContent = 'Please enter a valid number';
                return;
            }
            
            // Convert to meters first, then to target unit
            const meters = input * lengthFactors[fromUnit];
            const result = meters / lengthFactors[toUnit];
            
            const fromLabel = document.getElementById('lengthFrom').options[document.getElementById('lengthFrom').selectedIndex].text.split(' ')[1];
            const toLabel = document.getElementById('lengthTo').options[document.getElementById('lengthTo').selectedIndex].text.split(' ')[1];
            
            document.getElementById('result').textContent = `${input} ${fromLabel} = ${result.toFixed(4)} ${toLabel}`;
        }

        function convertWeight(formData) {
            const input = parseFloat(formData.get('weightValue'));
            const fromUnit = formData.get('weightFromUnit');
            const toUnit = formData.get('weightToUnit');
            
            if (isNaN(input)) {
                document.getElementById('result').textContent = 'Please enter a valid number';
                return;
            }
            
            // Convert to grams first, then to target unit
            const grams = input * weightFactors[fromUnit];
            const result = grams / weightFactors[toUnit];
            
            const fromLabel = document.getElementById('weightFrom').options[document.getElementById('weightFrom').selectedIndex].text.split(' ')[1];
            const toLabel = document.getElementById('weightTo').options[document.getElementById('weightTo').selectedIndex].text.split(' ')[1];
            
            document.getElementById('result').textContent = `${input} ${fromLabel} = ${result.toFixed(4)} ${toLabel}`;
        }

        function convertTemperature(formData) {
            const input = parseFloat(formData.get('tempValue'));
            const fromUnit = formData.get('tempFromUnit');
            const toUnit = formData.get('tempToUnit');
            
            if (isNaN(input)) {
                document.getElementById('result').textContent = 'Please enter a valid number';
                return;
            }
            
            let celsius = input;
            
            // Convert input to Celsius first
            if (fromUnit === 'f') {
                celsius = (input - 32) * 5/9;
            } else if (fromUnit === 'k') {
                celsius = input - 273.15;
            }
            
            // Convert from Celsius to target unit
            let result = celsius;
            if (toUnit === 'f') {
                result = (celsius * 9/5) + 32;
            } else if (toUnit === 'k') {
                result = celsius + 273.15;
            }
            
            const fromLabel = document.getElementById('tempFrom').options[document.getElementById('tempFrom').selectedIndex].text;
            const toLabel = document.getElementById('tempTo').options[document.getElementById('tempTo').selectedIndex].text;
            
            document.getElementById('result').textContent = `${input} ${fromLabel} = ${result.toFixed(2)} ${toLabel}`;
        }

        function resetCalculator() {
            // Reset all forms
            document.getElementById('lengthForm').reset();
            document.getElementById('weightForm').reset();
            document.getElementById('temperatureForm').reset();
            
            // Reset result
            document.getElementById('result').textContent = 'Enter values and click Convert';
        }

        // Add form submit event listeners
        document.getElementById('lengthForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            convertLength(formData);
        });

        document.getElementById('weightForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            convertWeight(formData);
        });

        document.getElementById('temperatureForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            convertTemperature(formData);
        });

        document.getElementById('resetForm').addEventListener('submit', function(e) {
            e.preventDefault();
            resetCalculator();
        });