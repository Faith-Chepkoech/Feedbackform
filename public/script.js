document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const data = Object.fromEntries(formData); // Convert FormData to a plain object

        // Log the data to be sent for debugging
        console.log('Data being sent:', JSON.stringify(data));

        try {
            const response = await fetch('http://localhost:3001/submit-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Ensure `data` is valid
            });
        
            // Check if the response is okay (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const result = await response.json(); // Process successful response
            console.log('Feedback submitted successfully:', result);
            alert('Feedback submitted successfully!'); // Optional alert for success
        } catch (error) {
            // Log error details for debugging
            console.error('There was a problem with the fetch operation:', error);
            alert('Error submitting feedback: ' + error.message);
        }
    });
});
