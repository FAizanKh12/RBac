// Mock data for users and roles
let users = [
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Editor', status: 'Inactive' },
];

let roles = [
    { name: 'Admin', permissions: 'Read, Write, Delete' },
    { name: 'Editor', permissions: 'Read, Write' },
];

// Function to load user data dynamically into the user management page
function loadUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear the list before loading new data

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>
                <a href="edit-user.html?id=${user.id}" class="btn">Edit</a>
                <button class="btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userList.appendChild(row);
    });
}

// Function to delete a user (simulate the deletion)
function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    loadUsers(); // Reload the user list
    alert('User deleted successfully');
}

// Function to load roles dynamically into the role management page
function loadRoles() {
    const roleList = document.getElementById('role-list');
    roleList.innerHTML = ''; // Clear the list before loading new data

    roles.forEach(role => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${role.name}</td>
            <td>${role.permissions}</td>
            <td>
                <a href="edit-role.html?role=${role.name}" class="btn">Edit</a>
            </td>
        `;
        roleList.appendChild(row);
    });
}

// Function to add or edit a user (simulated)
function saveUser(event) {
    event.preventDefault(); // Prevent the default form submission

    const userId = new URLSearchParams(window.location.search).get('id');
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const status = document.getElementById('status').value;

    if (userId) {
        // Edit user
        const user = users.find(u => u.id == userId);
        user.name = name;
        user.role = role;
        user.status = status;
        alert('User updated successfully');
    } else {
        // Add new user
        const newUser = {
            id: users.length + 1,
            name,
            role,
            status
        };
        users.push(newUser);
        alert('User added successfully');
    }

    // Redirect back to the dashboard after saving
    window.location.href = 'dashboard.html';
}

// Function to save or edit a role (simulated)
function saveRole(event) {
    event.preventDefault(); // Prevent the default form submission

    const roleName = document.getElementById('role-name').value;
    const permissions = document.getElementById('permissions').value;

    const roleIndex = roles.findIndex(role => role.name === roleName);

    if (roleIndex > -1) {
        // Edit role
        roles[roleIndex].permissions = permissions;
        alert('Role updated successfully');
    } else {
        // Add new role
        const newRole = { name: roleName, permissions };
        roles.push(newRole);
        alert('Role added successfully');
    }

    // Redirect back to the dashboard after saving
    window.location.href = 'dashboard.html';
}

// Load user and role data when pages load
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('user-list')) {
        loadUsers(); // Load users in the user management page
    }

    if (document.getElementById('role-list')) {
        loadRoles(); // Load roles in the role management page
    }

    if (document.getElementById('edit-user-form')) {
        const userId = new URLSearchParams(window.location.search).get('id');
        if (userId) {
            const user = users.find(u => u.id == userId);
            if (user) {
                document.getElementById('name').value = user.name;
                document.getElementById('role').value = user.role;
                document.getElementById('status').value = user.status;
            }
        }
    }

    if (document.getElementById('edit-role-form')) {
        const roleName = new URLSearchParams(window.location.search).get('role');
        if (roleName) {
            const role = roles.find(r => r.name === roleName);
            if (role) {
                document.getElementById('role-name').value = role.name;
                document.getElementById('permissions').value = role.permissions;
            }
        }
    }
});
